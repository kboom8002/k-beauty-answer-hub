# System Architecture

## 1. 개요 (Overview)
K-Beauty Answer Hub OS v1은 웹 검색 트래픽을 선점하는 **공개 허브**와 브랜드의 정답 자산을 구축하는 **비공개 워크스페이스(B2B SaaS)**로 구성된 하이브리드 웹 애플리케이션입니다. 빠른 렌더링 성능과 확장성, 그리고 안전한 데이터 보호를 위해 Next.js + Supabase 서버리스 스택을 채택합니다.

## 2. 기술 스택 (Tech Stack)
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling & UI**: Tailwind CSS, shadcn/ui 기반 커스텀 디자인 시스템
- **Backend / API**: Next.js Server Actions & Route Handlers
- **Database / Auth / Realtime**: Supabase (PostgreSQL, Row-Level Security)
- **AI Processing Layer**: Gemini API (서버사이드 전용 인퍼런스)
- **Deployment 인프라**: Vercel (Frontend & Serverless Functions) + Supabase Hosted (DB)

## 3. 렌더링 및 캐싱 전략 (Rendering Strategy)
- **퍼블릭 공개 페이지 (Public Hub)**
  - Home, Ingredients, Concerns, Buyer's Guide, Brand/Product Public Page 등은 트래픽과 검색엔진 최적화(SEO)를 고려해 **SSG(Static Site Generation)** 및 **ISR(Incremental Static Regeneration)**을 적극 활용합니다.
  - 정적 캐싱을 통한 빠른 초기 로딩 속도 구사에 집중하여 페이지 이탈을 최소화합니다.
- **비공개 워크스페이스 (B2B Workspace)**
  - 인증 세션 기반의 실시간 데이터 대시보드 및 리뷰어 작업 환경은 보안과 최신 데이터 정합성이 필수이므로 **SSR(Server-Side Rendering)** 및 클라이언트 사이드 Hydration을 선별적으로 혼용합니다.

## 4. 데이터 플로우 (Core Data Flow)
1. **사용자 요청 처리**: 브라우저에서 Client Component나 Form 액션을 통해 사용자 요청이 발생.
2. **Next.js & Server Actions**: Next.js 백엔드 계층에서 요청을 인터셉트 및 검증. 서버 컴포넌트나 비동기 Server Action에서 직접 비즈니스 로직 수행.
3. **보안 및 트랜잭션 (Supabase)**: Server Action 수행 시 현재 사용자의 세션 토큰을 인증하고, 데이터베이스 단의 **RLS(Row Level Security)** 정책을 통과한 질의에 한해서만 데이터 수정/조회.
4. **AI 태스크 위임 (Gemini)**: 질문 처방(Question Prescription), 카드 초안 생성, 리뷰 검토 등은 브라우저를 우회하여 백엔드에서 Gemini API로 호출되며, 결과값은 Zod 스키마 검증 후 DB에 저장 혹은 즉각 클라이언트 UI에 반환.

## 5. 인프라 보안 및 안전 원칙 (Security & Reliability)
- **환경 변수 통제**: Gemini API Key, Supabase Service Role Key 등 민감한 인증 키는 오직 서버리스 함수/Route Handlers 내부 구동 환경에서만 접근하며 클라이언트 번들에 노출시키지 않습니다.
- **우아한 성능 저하 (Graceful Degradation)**: AI 요청이 실패하거나 외부 API Rate Limit에 도달한 상황에서도 수동 작성 대체(Fallback UI) 기능을 상시 작동해 서비스 오작동 및 데이터 손실을 방지합니다.
- **테넌트 간 분리 (Multi-Tenant Isolation)**: Supabase Auth 세션과 RLS를 결합 적용함으로써 타 브랜드 담당자나 허가되지 않은 권한의 사용자가 서로의 자산(Asset / Dossier)에 접근하는 것을 원천 차단합니다.
