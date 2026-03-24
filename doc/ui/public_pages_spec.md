# Public Pages UI/UX Specification

## 1. Home (/)
- **목적**: K-뷰티 질문 허브 정체성을 즉시 확립하고, 검색 탐색 니즈(B2C)와 브랜드 B2B 진단 리드 니즈를 동시에 충족시킵니다.
- **주요 UI 블록 구성**:
  - **Hero Search**: "K-Beauty 질문의 최종 결론을 찾으세요" 카피와 대형 화면 중앙 검색창 (`SearchBox`). 검색창 아래 4~6개의 추천 검색어 Chips 배치(ex. 'PDRN 효능', '민감성 피부 선크림').
  - **Trending Blocks**: 급상승 성분, 주요 피부 고민(Concern), 인기 가이드를 화면 가득 채우는 3-Column 카드 레이아웃으로 전개합니다.
  - **Trust Strip**: 플랫폼 사이트 전체가 '전문가 리뷰 & 데이터 기반'임을 강조하는 안내 띠를 고정 배치.
  - **For Brands CTA**: 브랜드 담당자를 타겟하여 "Brand MRI Snapshot 무료 진단"을 신청하도록 유도하는 전환 블록.

## 2. Ingredients / Concerns Detail Page
- **공통 2-Column 데스크톱 레이아웃 (모바일은 One Column Stack)**
  - **Left (Primary, 8 cols)**: 고민/성분의 정의 (Hero 영역), 효능 및 특징 (What it helps with), 적합 대상 (Who it fits), 부작용/주의점 (What to watch out for), FAQ를 서술형이 아닌 단답형 카드로 전개.
  - **Right (Secondary, 4 cols)**: 관련 화장품 제품군 연결 카드, 관련 Buyer’s Guide 연결, **TrustStrip** (정보의 신뢰성을 알리기 위해 스크롤을 내려도 함께 따라오는 Sticky 고정 적용).

## 3. Buyer's Guides Detail Page
- **목적**: Top 5 화장품 추천 리스트업 및 개별 브랜드 Deep-dive로의 명확한 유도.
- **주요 UI 블록 구성**:
  - **Top 5 Table**: 순위(Rank), 제품명, Best for(누가 쓰면 좋은가), 강점(Strengths), 주의점(Caution)을 나열. 모바일 환경에선 가로로 길어지는 Table 대신 `Stacked Cards` 포맷으로 자동 변형.
  - **Best for / Not for Cards**: '건성에게 최고', '지성 결절 여드름엔 금물' 등으로 대상을 극명히 분리해 추천 가시성을 돕는 카드 팩.
