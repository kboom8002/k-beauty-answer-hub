# Workspace Pages UI/UX Specification (B2B SaaS)

## 1. Dashboard (`/app/dashboard`)
- **목적**: 워크스페이스에 접속한 브랜드 브랜드 관리자나 데이터 분석가, 외부 리뷰어가 본인의 현재 '할 일'과 '진척도'를 한 눈에 파악(Action-Oriented).
- **주요 UI 블록 구성**:
  - **상단 메트릭 뷰**: `등록된 브랜드 수`, `관리 중인 제품 수`, `리뷰를 기다리는 Asset 건수`, `Observatory 변경 알람` 4개의 핵심 KPI StatCard 배치.
  - **중간 리포징 영역**: 최신 `Recent Benchmark` 차트 스니펫 타일과 담당자 본인이 처리해야 할 `해야 할 일(Task List)` 타일 그리드 분할.

## 2. Brand Question Prescription (`/app/brands/[id]/question-prescription`)
- **목적**: 유저가 던질 수퍼 질문 포트폴리오를 탐색/정본/트러스트/비교/행동의 5개 축으로 나누고 적절한 답변 문서를 매핑.
- **3-Column 작업 환경 구현**:
  - **Left Rail**: 질문군 분류 전체 구조도 카테고리 트리.
  - **Center Editor**: `Question Ladder Editor`. 메인 질문 하나에 꼬리를 무는 연쇄/파생 질문을 Rung 단위로 묶어 직관적으로 추가/제거할 수 있는 편집 뷰.
  - **Right Panel**: 선택된 질문 기반으로 지금 만들기를 권장하는 UI 자산(Asset type) 추천 목록 및 Trust Action 추가 알림.

## 3. Answer Card Builder (`/app/products/[id]/answer-assets`)
- **UI 흐름 및 작업 뷰**:
  - **목록 탐색**: 좌측 List에서 수정할 Draft 상태의 답변 에셋을 선택합니다.
  - **메인 에디터**: 중앙 캔버스에서 해당 질문의 `Question Text`, `Answer Body`(결론형 텍스트), `Evidence`(논문/자료 연결), 필요하다면 `Boundary`(면책 조항) 영역을 입력 및 편집합니다.
  - **AI & Review 패널**: 우측 패널에서 Gemini AI가 자동으로 제공하는 초안(Suggestions)을 버튼 하나로 병합할 수 있습니다. 수고가 끝나면 `Assign Reviewer` 패널을 통해 전문가에게 즉시 노티피케이션과 함께 검수 요청을 전송합니다.

## 4. Observatory (`/app/observatory`)
- **목적**: 우리가 작성한 Answer Card로 인해 얻는 AEO(AI Engine Optimization) 가시성 제고 성과를 눈으로 확인하는 곳.
- **주요 뷰 구성**:
  - **추이 차트 (Line Chart)**: 주/월별 단위로 나의 답변 혹은 브랜드 리스트가 전체 경쟁 모델 질문 속 Top-3에 노출(Top-3 inclusion)되는 확률 트렌드 선 그래프 표시.
  - **질문 증감도 표 (Delta Table)**: 이전에 없었으나 답변 채택으로 얻어낸 획득 질문 (Gained Questions) 목록 vs 타사 답변에 밀려 권장 순위가 떨어진 잃어버린 질문 (Lost Questions) 목록을 나란히 대비하여 향후 태스크의 우선순위를 짚어줍니다.
