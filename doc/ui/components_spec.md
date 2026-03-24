# Components Specification

## 1. 공개/비공개 공통 핵심 UI 컴포넌트

### 1-1. AnswerCard
질문에 대한 최종 답변 및 정책을 담는 핵심 레이아웃 타일입니다.
- **Props**: `title`, `questionText`, `answerText`, `evidenceRefs(배열)`, `boundaryText` (선택), `reviewedBy` (선택), `status`, `ctaUrl`
- **Variants**: `public` (일반 웹용 UI), `workspace_draft` (에디터가 포함되고 승인을 대기하는 형태), `compact` (리스트 뷰포트 요약형)

### 1-2. CompareMatrix
주요 제품, 성분, 가이드 등을 스펙/효능 기반 표 형태로 비교하는 컴포넌트입니다.
- **Props**: `title`, `columns`(평가 항목, ex. 성분 함량, 타겟 대상), `rows`(제품/성분 리스트), `bestFor` / `notFor` 태그, `evidenceLinks`

### 1-3. TrustStrip
현재 정보의 신뢰도(Trust metadata)를 상단이나 하단 띠(스트립) 형태로 노출하여 신뢰감을 줍니다.
- **Props**: `reviewedBy` (의사/전문가 이름 및 소속), `updatedAt` (최종 징후 반영일), `evidenceCount` (참고 레퍼런스 출처 개수), `cautionFlag`, `methodologyLink`

### 1-4. ScorecardTile
브랜드 벤치마크 점수나 개별 제품 성과 스코어를 표시하는 대시보드 내 타일 UI입니다.
- **Props**: `title`, `value`(메인 점수), `delta`(증감 양/음 추이), `statusColor` (점수에 따른 그린/레드 계열), `helpText`(점수 기준 설명 tooltip)

## 2. 상태 메타 및 소형 배지 컴포넌트
- **ReviewStatusBadge**: `Draft`(AI 작성 중) / `In Review`(사람 검수 중) / `Approved`(승인됨) / `Rejected`(반려/재수정 필요) 모델을 시각적으로 쪼개 보여주는 상태 라벨.
- **EntityMetaBar**: 카드 상단 혹은 타이틀 하단에 위치하여 `evidence count`, `author`, `updated date` 정보를 아주 작고 compact하게 한 줄로 밀집시켜 표시.
