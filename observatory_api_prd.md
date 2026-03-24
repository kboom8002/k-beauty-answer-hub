# K-Beauty Answer Hub OS: Observatory API PRD
**Status**: Draft  
**Target Phase**: V2 Commercialization (Phase 2)  
**Document Purpose**: 현재 프론트엔드 UI([src/app/app/observatory/page.tsx](file:///c:/Users/User/KBeautyAnswerHub/src/app/app/observatory/page.tsx))에 표시되는 AEO(AI Engine Optimization) 관측소 통계를 실제로 구동하기 위한 **독립 백엔드 API 서비스 요구사항 정의서(PRD)**입니다. 별도로 구축할 외부/내부 데이터 통합 API 모듈 개발팀을 위한 문서입니다.

---

## 1. 개요 (Overview)
Observatory(관측소)는 브랜드(Tenant)가 발행한 K-Beauty Answer Card들이 실제 구글 등 퍼블릭 웹과 AI 에이전트 환경에서 어느 정도로 노출되고, 클릭을 얻어내는지(SoV, CTR)를 추적하는 핵심 대시보드입니다. 이 데이터를 프론트엔드에서 연산하는 대신 **Analytics API** 계층을 별도 구축해 빠르고 일관된 형태로 데이터를 공급해야 합니다.

## 2. API 엔드포인트 도출 (Endpoints)
UI 화면을 역설계했을 때, 3개의 주요 API 엔드포인트 구조가 도출됩니다. 모든 엔드포인트는 `brand_id` 기반 테넌트 분리와 `date_range` 조정을 기본으로 지원해야 합니다.

### 2.1 통합 주요 지표 (Core Metrics)
- **Endpoint**: `GET /api/v1/observatory/metrics`
- **설명**: 화면 최상단의 4개 카드 지표(점유율, 총 노출, 클릭, 공유)를 반환.
- **Data Source**: Google Analytics 4 API (퍼블릭 체류/클릭), Google Search Console (노출), 자체 Supabase DB.
- **Response Schema**:
  ```json
  {
    "data": {
      "shareOfVoice": { "value": 14.2, "trend": 2.4, "status": "up" },
      "totalImpressions": { "value": 42501, "trend": 12, "status": "up" },
      "searchClicks": { "value": 3205, "trend": -1.5, "status": "down" },
      "linkShares": { "value": 890, "trend": 20, "status": "up" }
    }
  }
  ```

### 2.2 성과 우수 자산 랭킹 (Top Performing Answer Cards)
- **Endpoint**: `GET /api/v1/observatory/top-cards`
- **설명**: 노출수 및 전환율(CTR)이 가장 높은 답변 자산(Answer Card) N개를 추출합니다.
- **Parameters**: `?limit=5&sortBy=views` (조회수 또는 CTR 기준 정렬)
- **Data Source**: 자체 Supabase `answer_assets` 테이블과 GA4 Event 결합.
- **Response Schema**:
  ```json
  {
    "data": [
      {
        "asset_id": "uuid-...",
        "title": "수부지에게 무기자차가 건조한 이유",
        "views": 12400,
        "ctr": 4.2
      }
    ]
  }
  ```

### 2.3 AI 벤치마크 시뮬레이터 (AI Benchmark Simulation)
- **Endpoint**: `GET /api/v1/observatory/benchmark`
- **설명**: K-Beauty 핵심 트렌드 키워드("세라마이드 크림 추천") 하에서 당사 및 경쟁사 브랜드의 AI 도출 가중치(Score) 추이를 제공합니다.
- **Data Source**: 퍼플렉시티, 챗GPT 등 외부 LLM 크롤러/시뮬레이터 주기적 실행 결과.
- **Response Schema**:
  ```json
  {
    "data": {
      "simulationQuery": "올리브영 세라마이드 크림 추천 좀",
      "insightAnalysis": "AI Agent Benchmark 시스템이 최신 트렌드를 모사하여...",
      "competitors": [
        { "name": "Acme Skin(Our Brand)", "score": 82, "isOurs": true },
        { "name": "Competitor A", "score": 65, "isOurs": false },
        { "name": "Competitor B", "score": 58, "isOurs": false }
      ]
    }
  }
  ```

---

## 3. 기능 및 비기능 요구사항 (Requirements)

### 3.1 기능적 요구사항 (Functional)
1. **캐싱 및 실시간 (Caching Strategy)**:
   - 외부 API(GSC, GA4) 통신 지연 폭주를 막기 위해 **Redis** 혹은 **Supabase Edge Cache**를 통해 최소 1시간 주기의 캐시 처리를 해야 합니다.
2. **다중 소스 병합 병렬화 (Aggregation Layer)**:
   - `metrics` 정보 획득 시 GSC, GA4, 내부 DB 조회가 동시다발적으로 필요합니다. 백엔드는 이를 `Promise.all` 기반 병렬 호출로 최적화해야 합니다.
3. **가짜 데이터(Mock)의 점진적 교체**:
   - 외부 API 연동이 덜 끝난 지표는 백엔드에서 강제로 `Mock API Response`를 내려주어 프론트 UI 개발이 얼룩지지 않도록 보장해야 합니다.

### 3.2 보안 및 권한 제어 (Security)
1. **토큰 검증 (JWT)**:
   - 프론트엔드가 요청 헤더에 싣는 사용자 토큰(Supabase Auth)을 검사해, 해당 User가 소속된 `brand_id`의 통계만 집계하도록 **Data Silo** 정책을 확립해야 합니다.
2. **Rate Limiting**:
   - 짧은 시간에 너무 많은 대시보드 리프레시 요청이 들어오지 않도록 IP 또는 테넌트별 API Rate Limiting을 설정합니다.
