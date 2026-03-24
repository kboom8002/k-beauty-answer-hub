# User Flows & System Sequence Specification

## 1. 개요
K-Beauty Answer Hub OS v1의 3대 핵심 이해관계자(소비자, 브랜드 브랜드 관리자, 시스템 리뷰어)가 플랫폼과 상호작용하는 4가지 메인 워크플로우를 정의합니다. 핵심 가치인 "탐색 -> 진단 -> 초안 생성 -> 검수 및 발행" 순기의 흐름을 시퀀스로 나타냅니다.

## 2. 4대 핵심 워크플로우

### 2.1 D-SSoT : 일반 유저 B2C 검색 및 탐색 플로우 (Public Discovery Flow)
1. **Search**: 유저가 메인 홈 화면(/)의 대형 검색창에 "수부지 장벽 고민 해결법" 쿼리 입력.
2. **Intent Parsing**: `Search Intent Summarizer` 에이전트가 백그라운드에서 단순 단어 매칭을 넘어 '고민(Concern)', '성분(Ingredient)' 객체를 분석, 분기.
3. **Explore**: 시스템이 관련 성분(ex. 세라마이드), 피해야 할 주의점, 베스트 가이드(Buyer's Guide) 조합을 결과로 반환.
4. **Deep-Dive**: 유저가 랭킹의 특정 화장품을 클릭하여 상세 페이지(Product Public Page)에 진입, 파편화된 스펙이 아닌 'Answer Card(답변)'와 'TrustStrip(의사/약사 리뷰 패치)'을 확인해 즉각 신뢰를 얻음.
5. **Action**: 만족한 유저가 하단의 제휴 링크 또는 브랜드 공식몰 버튼(CTA)을 클릭해 트래픽(매출) 전환.

### 2.2 리드 확보 : 브랜드 관리자 진단 플로우 (Brand MRI Onboarding Flow)
1. **Request**: 브랜드 담당자가 `/for-brands` 랜딩 페이지 접속 후 "무료 Brand MRI 진단" 클릭하여 브랜드/제품명 제출.
2. **Assessment**: 백그라운드 서버 액션(`runBenchmark`)이 작동하여 해당 브랜드가 속한 카테고리 내에서 **AEO-Share(검색 장악력 측정)** 및 라이벌 탈취 비율 점수를 집계합니다.
3. **Dashboard Delivery**: 브랜드 담당자가 워크스페이스에 진입해 MRI Snapshot 결과(Radar Chart 및 Question Gap 테이블) 도출.
4. **Next Step**: 시스템이 자동으로 "방어를 위해 시급한 질문 5가지"를 안내하며 다음 작업(자산 구축) 구역으로 유도.

### 2.3 B-SSoT : 답변 자산 구축 및 AI 초안 플로우 (Asset Build & AI Draft Flow)
1. **Prescription**: 담당자가 대시보드에서 `Question Prescription Agent` 버튼 클릭. AI가 타겟 제품에 맞는 시장 방어용 연쇄 질문 사다리 5개 축을 펼쳐 줌.
2. **Draft Generation**: 담당자가 사다리의 특정 질문 하나를 선택하면 `Answer Card Drafting Agent`가 사전에 입력된 제품 전성분/클레임(Dossier)을 바탕으로 즉시 단답형 답변 카드(Draft) 텍스트를 구성함.
3. **Human Edit**: 담당자가 AI 생성 결과물을 에디터 화면에서 읽고 고치며, 의학적으로 위험한 면책 조항(Boundary)이 명시되었는지 점검 및 수동 수정.
4. **Submit for Review**: 편집이 끝난 카드를 `submitReviewRequest` 기능으로 `In Review` 상태로 전환. 리뷰어 큐(Queue) 탭으로 데이터 송신.

### 2.4 거버넌스 : 전문가 검수 및 발행 플로우 (Expert Overlay Flow)
1. **Assignment**: 권한을 부여받은 리뷰어 그룹(연구원, 의사, 약사)이 자신에게 할당된 대기 목록(Review Queue)을 확인하고 `/app/reviews/[id]/edit` 에 진입.
2. **Fact Check**: 리뷰어가 AI/브랜드가 작성한 Answer Card 본문과, 근거로 덧붙여진 Product Dossier 증빙 서류를 좌우(분할 화면)로 대조하며 과장 광고나 치명적 부작용 누락이 없는지 팩트체크.
3. **Decision Input**: 리뷰어가 정량/정성 점수, Reason Code(반려 규칙), 서술 코멘트 입력 후 결단(`Approve` 또는 `Reject`/`Revise`).
4. **Publish / Patch**:
   - **승인 시(Approve)**: 카드 상태가 `Approved`로 오르며, 시스템 자동화를 통해 `Published` 배지를 얻고 Public 환경 탐색 결과 1순위에 노출 개시됨 (검수자 실명 Badge 표기 완료).
   - **반려 시(Reject)**: 카드 상태가 반환되며, `Debrief Miner Agent`가 반려 로그(Reason Code)를 수집. 반복되는 잦은 반려 사유에 대해 담당자 화면에 Fix-It(수정/가이드) 권고안을 던져 시스템 강화 선순환 반복.
