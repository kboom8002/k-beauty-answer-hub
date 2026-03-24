# K-Beauty Answer Hub OS v1
## PRD + IA/GNB + 상세 명세 v1

---

## 0. 문서 개요

### 0.1 문서 목적
본 문서는 **K-Beauty Answer Hub OS v1** 웹사이트/웹앱을 구현하기 위한 제품 요구사항(PRD), 정보구조(IA/GNB), 화면/라우트, 도메인 모델, DB/API, AI 에이전트 워크플로, 운영/보안/측정 요구사항을 통합 정리한 기준 문서다.

### 0.2 제품 한 줄 정의
**K-Beauty Answer Hub OS v1 = 공개형 K-뷰티 질문 허브(D-SSoT Lite)와 비공개형 브랜드 권위 구축 워크스페이스(B-SSoT Builder Lite), 전문가 검수(Expert Overlay), 성과 측정(AEO Observatory Lite)을 결합한 Answer-First 운영 플랫폼**

### 0.3 기술 스택
- Frontend: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Next.js Route Handlers / Server Actions
- Database/Auth/Storage/Realtime: Supabase
- AI Layer: Gemini API
- Deployment: Vercel + Supabase Hosted

### 0.4 버전 범위
본 문서는 **Goldilocks MVP ~ v1 출시 범위**를 다룬다.

---

# 1. 제품 비전과 목표

## 1.1 왜 이 제품이 필요한가
K-뷰티 브랜드는 AI 검색/요약/추천 환경에서 다음 문제를 겪고 있다.

1. 카테고리 질문 시장에서 브랜드가 잘 보이지 않는다.
2. 브랜드/제품 관련 정보성 질문에 공식 정답 구조가 약하다.
3. claim, evidence, trust, boundary가 한데 묶인 정답 자산이 부족하다.
4. 무엇을 먼저 만들고, 무엇이 실제 성과를 내는지 측정하기 어렵다.

## 1.2 제품 목표
### Goal A. 공개 질문 허브 구축
- K-뷰티 성분/고민/비교/Top pick 질문 트래픽을 선점한다.

### Goal B. 브랜드 정답 본점 구축 워크플로 제공
- 브랜드가 질문 처방, Answer Card, Trust FAQ, Compare Card를 구조적으로 구축하게 한다.

### Goal C. 전문가 검수와 신뢰 구조 운영
- reviewedBy, evidence, boundary, consensus를 붙일 수 있게 한다.

### Goal D. 성과 측정과 개선 루프 제공
- D-MRI / Brand MRI / AEO Observatory Lite를 통해 before/after를 보여준다.

## 1.3 비즈니스 목표
- 무료/저가 진단 리드 생성
- Authority Lift Sprint, B-SSoT Build Pack 수주
- Managed MeaningOps 업셀
- 장기적으로 Workspace / SaaS / Marketplace로 확장

---

# 2. MVP 범위 정의

## 2.1 MVP 핵심 가치
**“질문 허브를 보여주고, 브랜드가 자기 질문 포트폴리오와 Answer Card를 만들고, 검수/측정/개선까지 연결되는 최소 운영체계”**

## 2.2 MVP 포함 범위
### 공개 영역
1. Home / Search
2. Ingredients Hub
3. Concerns Hub
4. Buyer’s Guide / Top 5
5. Product / Brand Deep-dive Public Page

### 비공개 영역
6. Brand MRI / D-MRI Snapshot
7. Question Prescription Workspace
8. Product Dossier Builder
9. Answer Card Builder Lite
10. Trust FAQ Builder
11. Expert Review Queue / Editor
12. Consensus / Certification
13. AEO Observatory Lite
14. Debrief / Patch Queue

## 2.3 MVP 제외 범위
- 풀 CMS
- 전자상거래 결제/장바구니
- 완전 다국어 운영
- 고급 퍼스널라이제이션 추천
- 대규모 커뮤니티 기능
- 자동화된 reviewedBy 승인 시스템
- 외부 고객용 완전 self-serve SaaS

---

# 3. 핵심 사용자

## 3.1 공개 사용자
### Persona A. 일반 사용자/소비자
- 고민/성분/제품 비교 질문을 가진 사용자
- 빠른 결론과 신뢰 가능한 설명을 원함

### Persona B. 콘텐츠 탐색 사용자
- K-뷰티 트렌드, 성분, 비교/추천 콘텐츠를 찾는 사용자

## 3.2 B2B 사용자
### Persona C. 브랜드 경영진
- 우리 브랜드가 어디서 지는지 알고 싶음
- 어떤 질문과 어떤 자산을 먼저 만들어야 하는지 알고 싶음

### Persona D. 브랜드 실무진
- Answer Card, FAQ, Trust Layer를 실제로 만들어야 함
- 검수와 리포트, 수정 우선순위가 필요함

### Persona E. MeaningOps 운영자 / 컨설턴트
- 벤치마크, 질문 처방, 카드 생성, reviewedBy, Retest를 운영해야 함

### Persona F. 전문가 리뷰어
- 간결한 dossier를 보고 structured review를 제출하고 싶음

## 3.3 내부 사용자
### Persona G. 관리자
- 유저/권한/프롬프트/패치/배지 상태를 관리해야 함

---

# 4. 제품 원칙

## 4.1 Answer-first
모든 페이지는 설명이 아니라 답변 구조로 설계한다.

## 4.2 Question-first IA
카테고리 트리보다 질문 구조를 우선한다.

## 4.3 Trust always visible
Evidence, reviewedBy, dateVerified, boundary를 보이게 둔다.

## 4.4 No dead-end
어떤 페이지에서도 다음 질문, 비교, deep-dive, action으로 이동 가능해야 한다.

## 4.5 D-SSoT와 B-SSoT의 역할 분리
- D-SSoT: 탐색/비교/추천/허브
- B-SSoT: 브랜드 정본/근거/경계/행동

## 4.6 Human override first
AI 생성 결과는 보조 초안일 뿐, publish-sensitive output은 사람 승인을 거친다.

---

# 5. IA / GNB 설계

## 5.1 최상위 GNB (공개 영역)
1. Home
2. Ingredients
3. Concerns
4. Buyer’s Guides
5. The Lab
6. Search
7. For Brands
8. Sign In

## 5.2 최상위 GNB (로그인 후 워크스페이스)
1. Dashboard
2. Benchmarks
3. Brands
4. Products
5. Reviews
6. Observatory
7. Debrief
8. Agent Patches
9. Admin (권한자만)

## 5.3 공개 IA 상세
### Home
- 히어로 검색창
- 급상승 성분
- 급상승 고민
- 추천 Buyer’s Guide
- 카테고리 리더보드
- For Brands CTA

### Ingredients Hub
- 성분 목록
- 성분 상세 페이지
- 관련 질문
- 관련 제품
- reviewedBy 코멘트

### Concerns Hub
- 고민 목록
- 고민 상세 페이지
- 원인/성분/추천/주의
- 관련 가이드

### Buyer’s Guides
- 섹터별 Top 5
- Best for / Not for
- Compare links
- Brand/Product deep-dive

### The Lab
- 팩트체크
- claim 해설
- 성분/기술 설명
- 잘못된 정보 바로잡기

### Search
- 통합 검색 결과
  - 질문
  - 성분
  - 고민
  - 제품
  - 브랜드
  - 가이드

### For Brands
- Brand MRI Snapshot 소개
- 서비스 설명
- 사례
- 진단 신청 CTA

## 5.4 비공개 IA 상세
### Dashboard
- 내 브랜드 현황
- 최근 benchmark
- 해야 할 작업
- review 대기
- patch 대기

### Benchmarks
- 섹터 목록
- 벤치마크 리더보드
- run 상세
- 제품 비교

### Brands
- 브랜드 리스트
- 브랜드 상세
- Brand MRI
- Question Prescription
- linked products

### Products
- 제품 리스트
- product dossier
- answer assets
- trust assets

### Reviews
- review queue
- expert review editor
- consensus
- certification

### Observatory
- before/after 그래프
- AEO-Share Lite
- top-3 inclusion
- trust signal

### Debrief
- debrief logs
- reason code 분석
- 주요 오류 패턴

### Agent Patches
- prompt patch
- rubric patch
- workflow patch
- 상태 관리

---

# 6. 라우트 맵

## 6.1 공개 라우트
- `/`
- `/ingredients`
- `/ingredients/[slug]`
- `/concerns`
- `/concerns/[slug]`
- `/buyers-guides`
- `/buyers-guides/[slug]`
- `/the-lab`
- `/the-lab/[slug]`
- `/search?q=`
- `/brands/[slug]`
- `/products/[slug]`
- `/for-brands`
- `/case-studies/[slug]`

## 6.2 인증 라우트
- `/login`
- `/logout`
- `/signup` (필요시)

## 6.3 워크스페이스 라우트
- `/app`
- `/app/dashboard`
- `/app/benchmarks`
- `/app/benchmarks/[sectorId]`
- `/app/brands`
- `/app/brands/[brandId]`
- `/app/brands/[brandId]/question-prescription`
- `/app/products`
- `/app/products/[productId]`
- `/app/products/[productId]/dossier`
- `/app/products/[productId]/answer-assets`
- `/app/reviews`
- `/app/reviews/queue`
- `/app/reviews/[productId]/edit`
- `/app/consensus/[sectorId]`
- `/app/certification/[productId]`
- `/app/observatory`
- `/app/observatory/[brandId]`
- `/app/debrief`
- `/app/debrief/[runId]`
- `/app/agent-patches`
- `/app/admin/users`
- `/app/admin/reason-codes`
- `/app/admin/prompts`

---

# 7. 핵심 사용자 플로우

## 7.1 공개 허브 플로우
질문 검색 → Ingredient/Concern/Guide 페이지 → 제품/브랜드 deep-dive → For Brands CTA 또는 구매/상담 CTA

## 7.2 브랜드 리드 플로우
For Brands → 진단 신청 → Brand MRI Snapshot → Question Prescription → Authority Lift Sprint 제안

## 7.3 브랜드 구축 플로우
브랜드 선택 → 제품 선택 → Product Dossier 생성 → Answer Card 초안 → Trust FAQ 초안 → reviewedBy 요청 → publish-ready 상태

## 7.4 Expert Overlay 플로우
Review Queue → Dossier 확인 → Expert Review 작성 → Consensus → Certification 승인

## 7.5 성과 운영 플로우
Benchmark Run → Observatory 확인 → Root Cause 확인 → Fix-It → Retest

---

# 8. 화면 상세 명세

## 8.1 Home
### 목적
- K-뷰티 질문 허브의 존재를 한 번에 이해시킴
- 탐색 유입과 브랜드 리드 둘 다 확보

### 핵심 컴포넌트
- Hero Search Bar
- Popular Ingredient Chips
- Popular Concern Chips
- Featured Buyer’s Guides
- Top Moved Categories
- For Brands CTA Block
- Trust Strip (reviewedBy / evidence-backed / updated)

### 핵심 CTA
- 질문 검색
- Buyer’s Guide 보기
- 브랜드 진단 요청

---

## 8.2 Ingredient Detail Page
### 목적
- 성분 질문을 답변형으로 정리
- 제품/브랜드 deep-dive로 연결

### 섹션
- 한 줄 정의
- 무엇에 쓰이는가
- 누구에게 맞는가
- 같이 쓰면 좋은 것 / 주의할 것
- 관련 제품
- 관련 가이드
- reviewedBy 코멘트
- 최근 업데이트

### 필수 데이터
- ingredient entity
- answer blocks
- related products
- trust metadata

---

## 8.3 Concern Detail Page
### 목적
- 고민별 질문 허브
- 탐색 질문을 결론 구조로 정리

### 섹션
- 고민 정의
- 이런 경우 의심해볼 질문
- 추천 성분
- 주의할 포인트
- Buyer’s Guide
- Compare links
- 브랜드 deep-dive 추천

---

## 8.4 Buyer’s Guide Page
### 목적
- 섹터 Top 5를 보여줌
- 유입을 브랜드 deep-dive와 거래로 연결

### 섹션
- Guide Overview
- Top 5 Table
- Best for / Not for
- Compare criteria
- Why these products
- Related brand deep-dive
- CTA block

### 핵심 KPI
- guide view
- product click-through
- brand deep-dive transition

---

## 8.5 Brand MRI Snapshot Page
### 목적
- 브랜드에게 “문제”를 시각화
- 무료/저가 진단의 웹앱화

### 섹션
- 현재 섹터 위치
- lost questions
- trust gap
- quick wins
- recommended next program

### 비주얼
- radar chart
- question gap table
- sector rank card

---

## 8.6 Product Dossier Page
### 목적
- 전문가와 운영자가 제품 검토를 빠르게 시작하게 함

### 섹션
- product summary
- claims
- benchmark snapshot
- evidence map
- prior issues
- AI draft notes

### 핵심 CTA
- Answer Card 생성
- Trust FAQ 생성
- Expert Review 요청

---

## 8.7 Answer Card Builder
### 목적
- 질문을 카드로 전환

### 섹션
- root question
- question ladder
- generated draft
- evidence attached
- boundary section
- CTA section
- save / request review

### 기능
- 카드 초안 생성
- edit / approve / versioning
- D-SSoT / B-SSoT 배치 태깅

---

## 8.8 Trust FAQ Builder
### 목적
- trust question을 answer-ready 상태로 만듦

### 섹션
- trust question list
- evidence mapping
- caution/boundary
- reviewedBy slot
- publish state

---

## 8.9 Review Queue / Editor
### 목적
- 전문가 검수 워크플로 제공

### 섹션
- assigned queue
- dossier preview
- structured review form
- scores
- reason codes
- approve / revise / reject

---

## 8.10 Observatory
### 목적
- 성과를 before/after로 보여줌

### 섹션
- AEO-Share Lite
- Top-3 inclusion
- First Mention
- Trust Signal Presence
- question-level movement
- Fix-It recommendations

---

## 8.11 Debrief / Patch Queue
### 목적
- 수정 이유를 구조화하고 다음 라운드 AI/운영 개선으로 연결

### 섹션
- debrief entries
- reason code summary
- repeated pattern summary
- patch requests
- patch status

---

# 9. 도메인 모델

## 핵심 엔티티
- Sector
- Ingredient
- Concern
- Brand
- Product
- BuyerGuide
- BenchmarkRun
- BenchmarkScore
- ProductDossier
- AnswerAsset
- TrustAsset
- EvidenceMap
- ExpertReview
- MetaEvaluation
- ConsensusNote
- CertificationStatus
- DebriefLog
- AgentPatchRequest
- Profile/User

## AnswerAsset subtype
- answer_card
- compare_card
- trust_card
- boundary_card
- process_card
- evidence_snapshot
- checklist_card

---

# 10. 권한/역할

## 공개 사용자
- read-only public content

## brand_admin
- 자기 브랜드/제품/자산 접근
- 카드 생성/수정
- 리뷰 요청
- observatory 조회

## analyst
- benchmark 운영
- dossier 생성
- 카드 초안 생성
- debrief / patch 관리

## reviewer
- assigned review만 접근
- 리뷰 작성
- 점수/코멘트 제출

## admin
- 전권한
- 유저/권한/프롬프트/배지 관리

---

# 11. 주요 기능 요구사항

## 11.1 Search
- 통합 검색
- query suggestions
- entity-aware result grouping
- 질문형 검색 결과 우선 노출

## 11.2 Benchmark
- 섹터별 리더보드
- product scorecard
- run history
- before/after comparison

## 11.3 Question Prescription
- 질문 5축(탐색/정본/트러스트/비교/행동) 기반 처방
- question ladder worksheet
- priority tagging

## 11.4 Answer Asset Management
- asset 생성
- versioning
- status: draft / review / approved / published
- linking to product/sector/ingredient/concern

## 11.5 Expert Overlay
- review assignment
- structured review form
- consensus generation
- certification flagging

## 11.6 Observatory
- question-level proxy / benchmark metrics
- overview charts
- exportable report

## 11.7 Debrief & Patch
- reason code logging
- repeated issue aggregation
- patch request lifecycle

---

# 12. 데이터베이스 개요 (Supabase)

## 12.1 주요 테이블
- profiles
- brands
- sectors
- ingredients
- concerns
- products
- buyer_guides
- benchmark_runs
- benchmark_scores
- product_dossiers
- answer_assets
- evidence_maps
- expert_reviews
- meta_evaluations
- consensus_notes
- certification_statuses
- debrief_logs
- review_reason_codes
- agent_patch_requests

## 12.2 공통 컬럼
- id
- created_at
- updated_at
- created_by
- updated_by

## 12.3 answer_assets 주요 컬럼
- asset_type
- title
- question_text
- answer_body
- evidence_refs
- boundary_text
- cta_text
- status
- public_visibility
- brand_id nullable
- product_id nullable
- sector_id nullable

---

# 13. API 설계 개요

## 공개 API/서버 액션
- GET `/api/search`
- GET `/api/ingredients/[slug]`
- GET `/api/concerns/[slug]`
- GET `/api/buyers-guides/[slug]`
- GET `/api/brands/[slug]`
- GET `/api/products/[slug]`

## 워크스페이스 API
- POST `/api/benchmark/run`
- GET `/api/benchmark/[sectorId]`
- POST `/api/question-prescription/generate`
- POST `/api/dossier/build`
- GET `/api/dossier/[productId]`
- POST `/api/answer-assets/generate`
- POST `/api/trust-assets/generate`
- POST `/api/reviews/submit`
- POST `/api/consensus/generate`
- POST `/api/certification/evaluate`
- POST `/api/debrief/submit`
- POST `/api/agent-patches/create`

---

# 14. Gemini API 활용 명세

## 14.1 에이전트 목록
### 공개 허브 지원
- Search Intent Summarizer
- Buyer’s Guide Draft Assistant

### 브랜드 워크스페이스 지원
- Question Prescription Agent
- Product Dossier Builder
- Answer Card Drafting Agent
- Trust FAQ Builder
- Compare Card Generator
- Evidence Mapper
- Review Draft Assistant
- Consensus Draft Assistant
- Debrief Miner
- Fix-It Composer

## 14.2 운영 원칙
- 모든 Gemini 호출은 서버사이드
- raw input / raw output / normalized output 저장
- prompt_version 저장
- zod validation 필수
- publish 전에 human approval 필수

---

# 15. 비기능 요구사항

## 성능
- 공개 페이지는 ISR/SSG 우선
- 워크스페이스는 SSR + client data hydration
- search result 2초 이내

## 보안
- Supabase Auth + RLS
- role-based route guards
- Gemini key server-only
- audit trail 유지

## 운영 안정성
- AI failure fallback
- malformed output safe handling
- retry policy
- manual override

## 사용성
- 모바일/데스크톱 반응형
- 실무형 대시보드 가독성
- 경영진용 한눈 대시보드 제공

---

# 16. 디자인 / UX 방향

## 디자인 톤
- 신뢰형 K-뷰티 / 리서치 랩 / 에디토리얼 + SaaS 하이브리드
- 과도한 화장품 광고 느낌보다 “질문에 대한 결론”이 보이는 구조

## UI 원칙
- answer-first card layout
- compare matrix
- trust strip
- visible metadata (reviewedBy, updatedAt)
- clear CTA hierarchy

## 핵심 컴포넌트
- Search Hero
- Answer Card
- Compare Matrix
- Trust Strip
- Evidence Snapshot
- Product Scorecard
- Review Status Badge
- Benchmark Chart
- Question Ladder Panel

---

# 17. 분석 / KPI

## 공개 허브 KPI
- search queries
- ingredient page views
- concern page views
- buyer’s guide CTR
- brand deep-dive CTR
- for brands CTA conversion

## B2B KPI
- diagnosis requests
- snapshot conversion rate
- sprint conversion rate
- managed retainer conversion
- review completion time

## 제품 KPI
- benchmark runs
- answer asset creation count
- reviewed assets count
- observatory uplift reports count

---

# 18. 초기 출시 로드맵

## Phase 1 (0~3개월)
- Home
- Ingredients Hub 5개
- Concerns Hub 3개
- Buyer’s Guides 2개
- Brand MRI Snapshot
- Product Dossier Builder
- Answer Card Builder Lite

## Phase 2 (3~6개월)
- Trust FAQ Builder
- Expert Overlay Queue
- Consensus / Certification
- Observatory Lite
- Debrief / Patch Queue

## Phase 3 (6~12개월)
- Workspace hardening
- self-serve onboarding 일부
- reviewedBy marketplace 고도화
- 더 많은 sector library

---

# 19. MVP 성공 기준

1. 공개 질문 허브에서 실제 검색/질문 탐색 경험이 작동한다.
2. 브랜드가 자기 제품의 질문 처방과 Answer Card 초안을 볼 수 있다.
3. 전문가 리뷰와 certification 상태 관리가 가능하다.
4. before/after 관측과 quick fix 제안이 가능하다.
5. 무료/저가 리드 상품과 Authority Lift Sprint로 연결된다.

---

# 20. 최종 한 줄 정리

**K-Beauty Answer Hub OS v1는 K-뷰티 질문 트래픽을 장악하는 공개형 질문 허브와, 브랜드의 공식 정답권을 설계·구축·검수·측정하는 비공개 운영 워크스페이스를 결합한 Answer-First 플랫폼으로, Next.js + Supabase + Gemini API 기반으로 Goldilocks MVP를 구현한다.**


---

# 21. 실제 화면 와이어프레임 / 페이지별 UI 명세 v1

## 21.1 공통 UI 시스템

### 공통 레이아웃
- Desktop 기준 최대 콘텐츠 폭: 1280px
- Main content width: 1120px 권장
- 좌우 margin/padding: 24px~32px
- Top nav height: 64px
- Workspace left rail width: 240px
- Right contextual panel width: 320px (필요 페이지에 한함)

### 공통 페이지 구조
1. Global Header / GNB
2. Page Hero or Page Title Row
3. Primary Content Zone
4. Secondary Insight/Meta Zone
5. Related Content / Next Action Zone

### 공통 컴포넌트
- SearchHero
- AnswerCard
- CompareMatrix
- TrustStrip
- EvidenceSnapshot
- EntityMetaBar
- ScorecardTile
- KPIStatCard
- ReviewStatusBadge
- DataTable
- FilterBar
- StickyCTA
- RightContextPanel
- EmptyState
- ErrorState
- LoadingSkeleton

### 공통 메타 요소
공개/비공개 주요 카드에는 아래 메타를 시각적으로 노출한다.
- reviewedBy
- updatedAt / verifiedAt
- evidence count
- status badge
- related links count

### 공통 상태
- loading
- empty
- partial data
- ai draft pending
- review pending
- approved
- rejected / revision required

---

# 22. 공개 영역 와이어프레임 명세

## 22.1 Home (`/`)

### 목적
- K-뷰티 질문 허브의 정체성을 즉시 이해시킨다.
- 검색과 허브 탐색, 브랜드 진단 CTA를 동시에 제공한다.

### 레이아웃
#### 섹션 A. Top Header
- Logo
- GNB: Ingredients / Concerns / Buyer’s Guides / The Lab / For Brands
- Search icon / field
- Sign in

#### 섹션 B. Hero Search
- 큰 타이틀: “K-Beauty 질문의 최종 결론을 찾으세요”
- 서브카피
- 대형 검색 입력
- 예시 질문 chips 4~6개

#### 섹션 C. Trending Blocks (3-column)
- 급상승 성분
- 급상승 고민
- 급상승 Buyer’s Guide

#### 섹션 D. Featured Guides
- 카드 3~4개
- Top Pick / Compare / Beginner Guide / Sensitive Skin Guide 등

#### 섹션 E. Why Trust Us
- TrustStrip
- reviewedBy / evidence-backed / updated cards

#### 섹션 F. For Brands CTA
- Brand MRI Snapshot 소개
- “무료 진단 신청” CTA

### 핵심 컴포넌트
- SearchHero
- ChipGroup
- GuideCardGrid
- TrustStrip
- CTASection

### 모바일 규칙
- Hero 검색창 전체 폭
- Trending 섹션은 세로 카드 스택
- Featured Guides는 horizontal scroll cards

### 주요 CTA
- 질문 검색
- Guide 보기
- 브랜드 진단 신청

---

## 22.2 Ingredients Index (`/ingredients`)

### 목적
- 성분 질문 허브의 진입점
- 성분 탐색/필터링/비교 시작점

### 레이아웃
#### 상단
- Page title
- 설명 카피
- Search input
- filter chips: 보습 / 장벽 / 진정 / 탄력 / 미백 / 여드름 / 선케어

#### 본문
- Left: filter rail (desktop)
- Right: ingredient card grid

### Ingredient Card 필드
- ingredient name
- one-line description
- 주요 효능 tags
- related guide count
- reviewed indicator optional

### 상태
- no results: 검색/필터 초기화 CTA

---

## 22.3 Ingredient Detail (`/ingredients/[slug]`)

### 목적
- 성분 질문에 대한 answer-first 정리
- 관련 제품/브랜드/가이드로 연결

### 데스크톱 레이아웃
#### Hero Row
- ingredient name
- one-line answer
- meta bar: reviewedBy, updatedAt, evidence count

#### Main 2-column
Left (primary, 8 cols)
1. What it is
2. What it helps with
3. Who it fits
4. What to watch out for
5. Related questions
6. Related products

Right (secondary, 4 cols)
- TrustStrip sticky card
- Quick facts
- Related concerns
- Related guides

### 핵심 컴포넌트
- EntityMetaBar
- AnswerCard blocks
- RelatedQuestionList
- RelatedProductCards
- Sticky TrustStrip

### UX 원칙
- 첫 화면에서 정의/효능/적합성/주의가 모두 보여야 함
- 스크롤 중 우측 패널 sticky 유지

---

## 22.4 Concerns Index (`/concerns`)

### 목적
- 고민형 탐색의 허브

### 레이아웃
- Top search/filter
- Concern category cards
- “문제로 시작하기” 섹션
- 민감성/장벽/붉은기/트러블/건조/탄력 등 타일

### Concern Tile 필드
- concern title
- one-line explanation
- linked guides count
- linked ingredients count

---

## 22.5 Concern Detail (`/concerns/[slug]`)

### 목적
- 문제에서 시작해 성분/선택/가이드로 연결

### 레이아웃
#### Hero
- concern name
- “이런 질문을 자주 합니다” teaser

#### Main 2-column
Left:
1. What this concern means
2. Common questions
3. Key ingredients
4. Recommended guide cards
5. Compare links

Right:
- Quick checklist
- When to be cautious
- Related brand deep-dives

### 핵심 컴포넌트
- FAQList
- IngredientMiniCards
- GuideCardGrid
- CautionCard

---

## 22.6 Buyer’s Guides Index (`/buyers-guides`)

### 목적
- 섹터별 Top 5 가이드 탐색

### 레이아웃
- title + subtitle
- category filter bar
- guide cards grid
- “most compared this week” strip

### Guide Card 필드
- guide title
- sector
- best for tag
- updatedAt
- product count

---

## 22.7 Buyer’s Guide Detail (`/buyers-guides/[slug]`)

### 목적
- Top 5를 명확하게 보여주고 brand/product deep-dive로 연결

### 데스크톱 레이아웃
#### Hero
- guide title
- who it is for
- methodology link
- updatedAt / reviewedBy summary

#### Section 1. Summary Shelf
- Top Stat Cards: category / reviewed / evidence / updated

#### Section 2. Top 5 Table
열:
- rank
- product
- best for
- strengths
- caution
- deep-dive CTA

#### Section 3. Why these products
- compare criteria
- concise explanation

#### Section 4. Best for / Not for cards
- segmented recommendation cards

#### Section 5. Related Comparisons
- compare links

#### Section 6. Brand Deep-dive Links
- related brand pages

### 핵심 컴포넌트
- ScoreTable
- BestForCard
- CompareLinksList
- BrandDeepDiveCards

### 모바일 규칙
- Top 5 table → stacked product cards

---

## 22.8 The Lab Index / Detail (`/the-lab`, `/the-lab/[slug]`)

### 목적
- 팩트체크 / claim 해설 / 오정보 방지

### 레이아웃
- article list with category filters
- detail page는 editorial article + fact box + related evidence

### Detail Page 핵심 섹션
- headline
- fact verdict strip
- explanation body
- what brands/users should know
- related evidence / related questions

---

## 22.9 Brand Public Page (`/brands/[slug]`)

### 목적
- B-SSoT의 공개 엔트리 포인트
- 브랜드 스토리 + 핵심 질문 허브 + 대표 제품 연결

### 레이아웃
#### Hero
- brand name
- one-line positioning
- trust metadata

#### Main sections
1. What this brand stands for
2. Top brand questions
3. Hero products
4. Trust & evidence summary
5. Related buyer’s guides

### 핵심 컴포넌트
- Brand Hero
- Brand Question Cards
- Hero Product Cards
- Trust Strip

---

## 22.10 Product Public Page (`/products/[slug]`)

### 목적
- 제품 관련 정본 질문과 trust를 answer-first로 제공

### 레이아웃
#### Hero
- product name
- one-line answer
- brand link
- badges: reviewed / evidence / updated

#### Main 2-column
Left:
1. Who it is for
2. Core claims
3. Key ingredients
4. How to use
5. Related compare links
6. Trust FAQ

Right:
- Product scorecard
- Related guides
- Related concerns
- CTA

---

# 23. 비공개 워크스페이스 UI 명세

## 23.1 Dashboard (`/app/dashboard`)

### 목적
- 브랜드 운영자가 현재 상태를 한 눈에 파악

### 레이아웃
#### Top Summary Row
- total brands
- active products
- review pending
- observatory alerts

#### Middle
- 최근 benchmark 카드
- 최근 debrief 카드
- 해야 할 일 task list

#### Bottom
- recently edited assets
- patch queue preview

### 핵심 컴포넌트
- KPIStatCard
- TaskListCard
- RecentRunsTable
- RecentAssetsTable

---

## 23.2 Benchmarks Index (`/app/benchmarks`)

### 목적
- 섹터별 벤치마크 관리

### 레이아웃
- page title
- create benchmark button
- filters: sector / status / date / brand
- benchmark runs table

### table columns
- sector
- run name
- date
- products count
- current leader
- target brand
- status
- view CTA

---

## 23.3 Benchmark Detail (`/app/benchmarks/[sectorId]`)

### 목적
- sector rank / product scores / question movement를 보여줌

### 데스크톱 레이아웃
#### Header
- sector title
- run selector
- export button
- rerun button

#### Section 1. KPI row
- average AEO-Share Lite
- top-3 inclusion
- trust signal presence
- first mention

#### Section 2. Leaderboard Table
열:
- rank
- product
- brand
- final score
- domain battle
- readiness
- trust flag
- actions

#### Section 3. Question Movement Panel
- question-by-question delta

#### Section 4. Product Compare Tabs
- score radar
- trust gaps
- lost questions

#### Right Panel
- quick recommendations
- create prescription CTA

---

## 23.4 Brand Detail (`/app/brands/[brandId]`)

### 목적
- 브랜드 운영 화면의 허브

### 레이아웃
#### Hero
- brand name
- stage/status
- linked sectors
- key risk flags

#### Tab navigation
- Overview
- MRI Snapshot
- Question Prescription
- Products
- Reviews
- Observatory

### Overview tab
- current rank snapshot
- top opportunities
- top risks
- active programs

---

## 23.5 Brand Question Prescription (`/app/brands/[brandId]/question-prescription`)

### 목적
- 질문 포트폴리오와 질문 사다리를 실제 편집

### 레이아웃
#### Top controls
- sector selector
- generate prescription button
- add question manually

#### Main layout 3-column
Left:
- question portfolio categories
  - 탐색
  - 정본
  - 트러스트
  - 비교
  - 행동

Center:
- selected question ladder editor
  - root question
  - rungs 1~6
  - linked asset suggestions

Right:
- priority panel
- trust needs
- recommended asset types

### 핵심 컴포넌트
- QuestionTreeNav
- LadderEditor
- AssetSuggestionList
- PriorityBadge

---

## 23.6 Products Index (`/app/products`)

### 목적
- 제품 단위 워크플로 진입

### 레이아웃
- filters: brand / sector / status
- product table
- create dossier button

### columns
- product
- brand
- sector
- dossier status
- answer assets count
- trust assets count
- review status
- observatory delta

---

## 23.7 Product Dossier (`/app/products/[productId]/dossier`)

### 목적
- 제품 정보를 검수/작성에 필요한 패킷으로 보여줌

### 데스크톱 레이아웃
#### Header
- product title
- rebuild dossier button
- request review button

#### Main 2-column
Left:
1. Product summary
2. Claims
3. Key ingredients
4. Benchmark snapshot
5. Prior issues

Right:
- Evidence map
- AI draft notes
- recommended questions
- quick actions

### 하단
- linked answer assets
- linked trust assets

---

## 23.8 Answer Card Builder (`/app/products/[productId]/answer-assets`)

### 목적
- 실제 카드 생성/편집/버전관리

### 레이아웃
#### Left rail
- asset list
- filter by type/status

#### Center editor
- title
- question text
- answer body
- evidence refs
- boundary
- CTA
- related links

#### Right panel
- AI suggestions
- trust indicators
- assign reviewer
- publish state

### asset state badge
- draft
- ai_draft
- in_review
- approved
- published

---

## 23.9 Trust FAQ Builder (embedded or dedicated page)

### 목적
- trust question만 모아 빠르게 생성/검수

### 화면 구조
- trust question list
- evidence mapping table
- boundary editor
- reviewer assignment
- publish checklist

---

## 23.10 Review Queue (`/app/reviews/queue`)

### 목적
- 리뷰어 및 운영자가 검수 대상을 빠르게 처리

### 레이아웃
- filters: reviewer / brand / severity / status
- review task cards or table

### task card 필드
- product
- asset title
- review type
- assigned reviewer
- due date
- risk level
- open editor CTA

---

## 23.11 Review Editor (`/app/reviews/[productId]/edit`)

### 목적
- structured review 입력

### 레이아웃
#### Left: asset / dossier preview
#### Right: review form

### Review form sections
- strengths
- fit scenarios
- limitations
- evidence notes
- overclaim risk
- boundary/caution
- recommended when / not recommended when
- scores
- reason codes
- decision

### Footer actions
- save draft
- submit review
- request revision

---

## 23.12 Consensus / Certification (`/app/consensus/[sectorId]`, `/app/certification/[productId]`)

### 목적
- 복수 의견을 정리하고 badge 상태를 관리

### Consensus 화면
- review comparison matrix
- disagreement map
- AI consensus draft
- editable consensus note

### Certification 화면
- badge checklist
- current state
- missing requirements
- approve button

---

## 23.13 Observatory (`/app/observatory`, `/app/observatory/[brandId]`)

### 목적
- 성과를 시각적으로 확인

### 레이아웃
#### Overview
- KPI row
- trend charts
- top movers
- watchlist

#### Brand detail
- before/after compare
- question movement table
- trust signal changes
- recommended next fix-it

### 차트
- line chart: AEO-Share Lite trend
- bar chart: question cluster movement
- table: top gained / top lost questions

---

## 23.14 Debrief (`/app/debrief/[runId]`)

### 목적
- 수정 이유와 패턴을 구조화

### 레이아웃
- debrief form
- linked assets
- reason code picker
- repeated issue panel
- suggested patch list

---

## 23.15 Agent Patch Queue (`/app/agent-patches`)

### 목적
- prompt/rubric/workflow 개선 요청 관리

### 레이아웃
- filter bar
- patch request table
- status columns (kanban optional)

### columns
- patch type
- title
- source debrief
- severity
- owner
- status
- apply CTA

---

# 24. 와이어프레임 수준 레이아웃 스케치 (텍스트)

## 24.1 Home
```text
[Header]
Logo | Ingredients | Concerns | Buyer’s Guides | The Lab | For Brands | Search | Sign In

[Hero]
K-Beauty 질문의 최종 결론을 찾으세요
[ Search input ........................................ ]
[chip] 민감성 피부 선크림 [chip] 세라마이드 토너 [chip] PDRN이 뭐야?

[Trending 3-up]
성분 | 고민 | 가이드

[Featured Guides Grid]
[card][card][card][card]

[Trust Strip]
reviewedBy | evidence-backed | updated weekly

[For Brands CTA]
Brand MRI Snapshot 받아보기
```

## 24.2 Buyer’s Guide Detail
```text
[Header]
Guide title | updatedAt | methodology | reviewed summary

[KPI row]
Top 5 | reviewed items | evidence count | updated

[Top 5 table]
rank | product | best for | strengths | caution | deep-dive

[Why these products]
short explanation

[Best for / Not for cards]
[card][card][card]

[Related compare links]
[link][link][link]
```

## 24.3 Product Dossier
```text
[Header] Product title | Rebuild Dossier | Request Review

[Main 2-col]
LEFT:
- summary
- claims
- key ingredients
- benchmark snapshot
- prior issues

RIGHT:
- evidence map
- AI notes
- recommended questions
- quick actions

[Linked assets table]
```

## 24.4 Question Prescription
```text
[Top controls] sector select | generate | add question

[3-col layout]
LEFT: question categories
CENTER: ladder editor (root question + rung 1~6)
RIGHT: priority / trust needs / suggested assets
```

---

# 25. 컴포넌트 상세 명세

## 25.1 AnswerCard
### Props
- title
- questionText
- answerText
- evidenceRefs[]
- boundaryText optional
- reviewedBy optional
- updatedAt
- cta optional
- status badge

### Variants
- public
- workspace_draft
- reviewed
- compact

## 25.2 CompareMatrix
### Props
- title
- columns[]
- rows[]
- bestFor / notFor optional
- evidence / note refs

## 25.3 TrustStrip
### Props
- reviewedBy
- updatedAt
- evidenceCount
- cautionFlag
- methodologyLink

## 25.4 ScorecardTile
### Props
- title
- value
- delta optional
- status color
- help text

## 25.5 ProductScoreRow
### Props
- product
- rank
- finalScore
- battleScore
- readinessScore
- trustFlag
- actionLinks

---

# 26. 모바일 UX 명세

## 공통 원칙
- 공개 페이지는 모바일 우선 최적화
- 워크스페이스는 태블릿 이상 우선, 모바일은 조회 중심

## 공개 모바일
- header는 compact
- search hero full width
- guide cards horizontal scroll
- table는 stacked cards

## 워크스페이스 모바일
- benchmark detail: summary 먼저, table는 accordion
- review editor: one-column form
- question ladder: stepper UI

---

# 27. 디자인 시스템 토큰 방향

## 타이포그래피
- Hero: 32~40px
- Section title: 24~28px
- Card title: 18~20px
- Body: 15~16px
- Meta: 12~13px

## 간격
- page section gap: 56~72px
- card padding: 16~24px
- form group gap: 16px

## 시각적 톤
- clean editorial + light SaaS
- rounded cards
- soft borders
- subtle shadows
- information hierarchy strong

---

# 28. 개발 우선순위 (UI 기준)

## P0
- Home
- Ingredients Detail
- Buyer’s Guide Detail
- Brand MRI Snapshot
- Product Dossier
- Answer Card Builder
- Review Queue / Editor
- Observatory Lite

## P1
- Concerns pages
n- The Lab
- Question Prescription workspace
- Consensus / Certification
- Debrief / Patch Queue

## P2
- richer search
- advanced compare matrix
- admin prompt editor
- marketplace flows

---

# 29. 최종 한 줄 정리

**K-Beauty Answer Hub OS v1의 실제 화면 설계는 공개 허브에서 질문과 결론을 먼저 보여주고, 비공개 워크스페이스에서 브랜드가 질문 처방·정답 카드·신뢰 FAQ·전문가 검수·성과 관측을 운영하는 구조로 짜여야 하며, 모든 페이지는 answer-first, trust-visible, no-dead-end 원칙을 따른다.**

