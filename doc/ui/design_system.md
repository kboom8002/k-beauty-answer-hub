# Design System & UI Tokens

## 1. 톤 앤 매너 (Visual Tone)
- **신뢰성 (Trust & Research)**: 과도한 화장품 리테일 배너 느낌을 피하고, 에디토리얼랩(Editorial Lab) 및 전문 B2B SaaS 느낌이 균형을 이루는 "Clean & Trusted" 톤을 지향합니다.
- **Answer-First 시각화**: 핵심 결론(Answer)과 비교 행렬(Compare Matrix), 정보의 한계점(Boundary)을 단락의 최상단에 배치하여 유저가 헤매지 않도록 돕습니다.

## 2. 타이포그래피 (Typography)
- **Hero Title**: `32~40px` (ex. 페이지 첫 진입 시 메인 질문 및 허브 타이틀)
- **Section Title**: `24~28px` (ex. What it is, Recommendation)
- **Card Title**: `18~20px` (ex. 개별 제품 명, 가이드 타일 명)
- **Body Text**: `14~16px` (ex. 가이드 본문, Answer 상세 설명)
- **Meta / Labels**: `12~13px` (ex. reviewedBy 태그, 날짜 포맷)

## 3. 컬러 시스템 (Color Usage)
- **Primary Brand (Trust Blue/Teal)**: 신뢰와 피부 과학을 상징하는 청록/블루 계열. (Link 텍스트, Primary CTA, 주요 Badge 배경)
- **Surface & Background**: `bg-white` (카드)와 `bg-zinc-50` (배경)을 교차 활용하여 카드 요소 시인성을 확보.
- **Border & Separators**: `border-zinc-200` 계열의 Soft border 활용.
- **Status Colors (신호등)**:
  - Success/Verified: `emerald-600` (검수 완료, 공식 답변)
  - Warning/Caution: `amber-600` (한계점, 오남용 경고 시)
  - Pending/Draft: `indigo-500` (워크스페이스 작성/초안 중)
  - Error/Reject: `red-600` (검수 반려)

## 4. 간격 및 레이아웃 (Spacing & Layout)
- **Maximum Content Width**: Desktop 기준 최대 폭 `1280px` (웹앱 내부 메인 컨텐츠 영역은 `1120px` 권장).
- **Gaps**: 페이지 큰 섹션 간격(`56~72px`), 개별 카드 내부 패딩(`16~24px`), 폼(Form) 요소별 그룹 간격(`16px`)으로 통일하여 여백을 일관되게 관리합니다.
