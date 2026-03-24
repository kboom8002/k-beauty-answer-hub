# Roles & Permissions Specification

## 1. 개요
K-Beauty Answer Hub OS v1은 불특정 다수에게 공개되는 영토(B2C 허브)와, 승인된 브랜드/전문가만이 들어올 수 있는 폐쇄적 워크스페이스(B2B SaaS)를 엄격히 구분합니다. 시스템 내 혼선을 막기 위해 총 5개의 권한 계층(Role Hierarchy)을 운영하며, 모든 권한 검증은 Supabase Auth의 JWT User Metadata 플러그인을 기준으로 판별됩니다.

## 2. 역할 (Roles) 정의

| 롤(Role) 명칭 | 설명 | 주 활동/접근 허용 라우트 |
|---|---|---|
| **Public** (비인증) | 검색 및 정보 습득 목적으로 방문한 일반 뷰티 소비자 | `/`, `/ingredients`, `/concerns`, `/products`, `/buyers-guides` 등 모든 루트 라우트 |
| **Brand Admin** | 자기 브랜드의 질문 진단(MRI) 및 정답 자산을 구축/관리하는 브랜드 소속 매니저 | `/app/dashboard`, `/app/brands/[id]`, `/app/products/[id]`, Observatory 등 자사 전용 구역 |
| **Reviewer** | 특정 제품/질문의 답변 카드를 검수할 수 있도록 자격이 부여된 외부 파트너(피부연구원, 약사 등) | `/app/reviews/queue`, `/app/reviews/[id]/edit` 영역 내 할당된 패킷 한정 |
| **Analyst** | 신규 벤치마크 평가를 백그라운드에서 실행하고, AI 프롬프트 패치나 전체 에러를 관제하는 내부 운영진 | `/app/benchmarks`, `/app/observatory` (전체 대상), `/app/agent-patches` |
| **Admin** | 시스템 최고 권한자 (유저 밴, 리뷰 반려 사유(Reason Code) 카테고리 설정, 배지 스키마 수정 등 수행) | `/app/admin/*` 및 플랫폼 전 영역 열람/수정 가능 |

## 3. 기능별 접근 권한 매트릭스 (Permission Matrix)

| 행위 (Actions) | Public | Brand Admin | Reviewer | Analyst | Admin |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Published 답변 카드 열람** | O | O | O | O | O |
| **Brand MRI 진단 그래프 확인** | X | O (내 브랜드만) | X | O | O |
| **Answer Card / FAQ 초안(Draft) 생성** | X | O (내 브랜드만) | X | O | O |
| **작성된 Asset의 상태 변경 (검수 요청 등)** | X | O (내 브랜드만) | X | O | O |
| **Asset 검수 의견 제출 및 Decision 행사** | X | X | O (할당된 것만)| X | O |
| **시장 Benchmark Runs 및 Observatory 동기화**| X | X | X | O | O |
| **AI 시스템 Rule, 프롬프트 파라미터 강제 수정**| X | X | X | X | O |

## 4. 프론트엔드 라우트 보호 매커니즘 (Next.js Middleware)
- **세션 낚아채기**: 클라이언트 단에서 진입 시 Next.js의 `middleware.ts` 엣지 함수를 통해 세션 쿠키 여부를 최상단에서 검증.
- **Unauthenticated 처리**: 비인증 사용자가 `Public` 권한 외부 영역인 `/app/*` 내부 라우트로 접근 제어 시 `/login` 라우터로 즉각 Redirect 처리.
- **Unauthorized 처리**: 인증되었으나 타겟팅된 Role과 맞지 않는 유저(예: Brand Admin Role 소지자가 `/app/admin` 접근 시도)는 `Next Response 403 Forbidden` 에러 페이지를 띄우거나, 권한이 부여된 베이스캠프인 `/app/dashboard`로 강제 반환.
