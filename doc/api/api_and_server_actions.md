# API & Server Actions Specification

## 1. 개요
K-Beauty Answer Hub OS v1은 Next.js App Router 아키텍처를 채택하고 있으므로, 공개 패치 성격이 강한 REST 요청은 `Route Handlers`(/api/*)를 이용하며, 워크스페이스 내에서 권한 의존성이 높고 타입 안정성이 필요한 폼 제출 및 DB 수정(Mutation) 로직은 `Server Actions`를 적극 활용합니다.

## 2. Public Route Handlers (외부 & 공개 읽기 API)
공개 허브의 클라이언트 사이드 데이터 Fetching이나 외부 연동을 위해 열려 있는 엔드포인트입니다.

### 2.1 검색 기능
- **GET** `/api/search`
  - **Query**: `?q={keyword}`
  - **기능**: 통합 검색 결과(성분, 고민, 제품, 뷰티 가이드) 반환. 검색어 자동완성(Suggestions) 용도로 함께 사용.
  - **응답 스키마**: `{ "ingredients": [], "concerns": [], "products": [], "guides": [] }`

### 2.2 엔티티 개별 데이터 조회
앱 내 SSG/SSR 이후의 클라이언트 하이드레이션 및 캐시 갱신 용도입니다.
- **GET** `/api/ingredients/[slug]`
- **GET** `/api/concerns/[slug]`
- **GET** `/api/buyers-guides/[slug]`
- **GET** `/api/products/[slug]`
- **GET** `/api/brands/[slug]`

---

## 3. Workspace Server Actions (B2B 내부 시스템 로직)
워크스페이스 내에서 브랜드 담당자나 서드파티 리뷰어가 호출하는 액션입니다. 코드 내부에서 Supabase RLS(인증) 토큰을 검증한 뒤 수행됩니다.

### 3.1 측정 & 진단 (Benchmark & Observatory)
- **`runBenchmark({ sectorId, brandId })`**
  - **기능**: 선택된 섹터의 노출도 벤치마크 평가를 백그라운드에서 실행.
- **`getObservatoryStats({ brandId, dateRange })`**
  - **기능**: 해당 브랜드의 시계열 AEO-Share Lite(AI 검색 추천 가시성) 데이터 점수 및 Gained/Lost 질문 세트 반환.

### 3.2 문서 초기화 및 진단생성 (Dossier & Prescription)
- **`buildProductDossier(productId)`**
  - **기능**: 특정 화장품 제품의 성분표, 클레임(광고 문구), 과거 리뷰 이슈 모음을 하나의 패킷(Dossier)으로 말아냅니다.
- **`generateQuestionPrescription(productId, brandId)`**
  - **기능**: Gemini API를 서버에서 안전하게 호출하여 해당 제품을 위한 '단계별 질문 사다리(Ladder)' 초안을 생성.

### 3.3 카드 에셋 제어 (Answer & Trust Assets)
- **`generateAssetDraft({ type, questionText, context })`**
  - **기능**: Gemini API 호출을 통해 Answer Card 또는 Trust FAQ의 단답형 답변 초안(Draft) 텍스트를 반환받음. (아직 DB 저장 안 함)
- **`saveAssetDraft(assetId, formData)`**
  - **기능**: 편집을 마친 Asset 카드를 워크스페이스 DB에 `Upsert` 저장(상태: `draft`).
- **`submitReviewRequest(assetId, selectedReviewerId)`**
  - **기능**: 초안의 권한 상태를 `in_review`로 변경시키고 할당된 전문가의 Review Queue에 작업을 추가.

### 3.4 리뷰 시스템 제어 (Expert Review & Consensus)
- **`submitExpertReview(assetId, reviewScores, reasonCodes)`**
  - **기능**: 리뷰어(약사/피부연구원 제한)의 최종 리뷰 폼 저장 및 통과/반려 Decision 처리. 반려 시 `reason_codes` 삽입.
- **`evaluateCertification(productId)`**
  - **기능**: 해당 제품에 귀속된 카드의 리뷰 통과 개수 비중을 따져 'Trust Certified' 배지를 부여/박탈.

---

## 4. 에러 핸들링 및 예외 정책
- **Auth Rejection (권한 없음)**: 401 Unauthorized 판정 시 라우팅을 우회하지 않고 `next/navigation`의 `redirect('/login')`으로 강제 로그인 이관.
- **AI Timeout & Rate Limit (Gemini 오류)**: 외부 API 단절 시 앱이 멈추지 않도록 "현재 AI 자동 생성을 사용할 수 없습니다. 수동으로 답변을 작성해주세요." 라는 Graceful Degradation(대체 메시지 UI) 작동.
- **Validation Fallback**: 클라이언트 단 전송값은 Zod(Zod Schema)를 거쳐 파싱되며 통과하지 못한 경우 UI 화면 상의 Field Error state로 즉각 반환됨 (`{ error: 'content must conform to policy' }`).
