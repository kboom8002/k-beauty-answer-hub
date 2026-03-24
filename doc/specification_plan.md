# K-Beauty Answer Hub OS v1 상세 명세 파일 제작 계획

제공해주신 `k_beauty_answer_hub_os_v_1_prd_and_spec.md` 문서를 정밀하게 분석하여, 프로젝트 구현에 필요한 상세 명세 문서들의 체계적인 관리 구조와 디렉터리 배치 계획을 도출했습니다.

## 1. 디렉터리 배치 계획

프로젝트의 `doc/` 디렉터리 하위에 각 도메인 및 기능별로 문서를 관심사 분리(Separation of Concerns)하여 관리하기 위해 다음과 같은 디렉터리를 구성했습니다.

```text
doc/
├── prd/            # 제품 요구사항 및 정책 (MVP 범위, 성과 지표)
├── architecture/   # 시스템 구조, 인프라, 기술 스택 연동 아키텍처
├── ui/             # 화면, 와이어프레임, 컴포넌트 명세 및 디자인 시스템
├── api/            # 외부/내부 API 명세 및 Server Actions 구조
├── db/             # 데이터베이스 스키마 및 보안(RLS) 규칙 명세
├── ai/             # Gemini API 프롬프트 관리 및 에이전트별 워크플로
├── auth/           # 권한 정책, 역할(Role)별 엑세스 티어 명세
└── workflows/      # 핵심 사용자 여정 및 시스템 시퀀스 플로우
```

---

## 2. 세부 상세 명세 파일 제작 계획 및 우선순위

실제 개발 진행을 위해 작성해야 할 상세 명세 파일의 목록과 추천하는 제작 우선순위(P0~P2)입니다.

### 📂 `doc/prd/`
- **`core_prd.md`** (P0): 현재 작성된 기획서 원본 유지 및 필수 참조.
- **`kpi_metrics_plan.md`** (P1): B2B/B2C 전환율(Conversion) 추적, Observatory 기능 연동을 위한 상세 지표 로깅 계획.

### 📂 `doc/architecture/`
- **`system_architecture.md`** (P0): Next.js App Router 기반의 서버/클라이언트 컴포넌트 전략, ISR/SSR/SSG 캐싱 전략, Supabase 연동 아키텍처 다이어그램.

### 📂 `doc/ui/`
- **`design_system.md`** (P0): 컬러, 타이포그래피, 간격 등 디자인 시스템 토큰 가이드라인 (Tailwind CSS, shadcn/ui 기준).
- **`components_spec.md`** (P0): AnswerCard, CompareMatrix, TrustStrip 등 핵심 공통 컴포넌트의 Props 및 상태 분기 리스트.
- **`public_pages_spec.md`** (P0): Home, Ingredients, Concerns, Buyer's Guide 등 공개 라우트 상세 화면 명세서.
- **`workspace_pages_spec.md`** (P1): Dashboard, Answer Card Builder, Review Editor 등 비공개 B2B 라우트 상세 와이어프레임과 제어 명세.

### 📂 `doc/api/`
- **`api_and_server_actions.md`** (P0): 클라이언트와 서버 통신을 위한 API Endpoint 목록 및 Next.js Server Actions의 Request/Response 스키마.

### 📂 `doc/db/`
- **`database_schema.md`** (P0): Supabase 테이블 명세 (brands, products, answer_assets 등), 관계(FK) 정의.
- **`rls_policies.md`** (P1): Supabase Row Level Security(RLS) 규칙 (퍼블릭 접근, 브랜드 관리자 접근, 서버 전용 접근 등 안전 보장 규칙).

### 📂 `doc/ai/`
- **`gemini_agents_workflow.md`** (P0): 'Question Prescription Agent', 'Answer Card Drafting Agent' 등 본문에 명시된 12개 에이전트의 역할 및 파이프라인.
- **`prompts_registry.md`** (P1): 세부 AI 프롬프트 템플릿, Zod 기반 JSON Output Schema 구조, hallucination 대비책.

### 📂 `doc/auth/`
- **`roles_and_permissions.md`** (P0): brand_admin, analyst, reviewer, admin 등 4~5개 계층 역할에 따른 화면 노출/쓰기/승인 권한표.

### 📂 `doc/workflows/`
- **`user_flows.md`** (P0): 일반 유저 검색 과정, 브랜드 담당자 카드 생성 과정, 전문가 검수 과정 등 핵심 5대 플로우 시퀀스 정의.

---

## 3. 다음 진행 추천 (Next Steps)
위 디렉터리들이 모두 생성되었습니다. 향후 본격적인 개발에 앞서 각 디렉터리의 **P0 (필수 시스템/DB 아키텍처 및 공통 기준)** 명세 파일부터 역순으로 생성하여 구체화하는 작업을 추천합니다. 어느 디렉터리의 명세부터 작성할지 알려주시면 상세 작성을 진행하겠습니다.
