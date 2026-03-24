# Core PRD
> 기반 문서: `doc/k_beauty_answer_hub_os_v_1_prd_and_spec.md`

## 1. 제품 비전 (Product Vision)
**K-Beauty Answer Hub OS v1**은 K-뷰티 브랜드가 AI 검색 환경(SGE/AEO)에서 브랜드와 정답의 권위를 확보하기 위한 플랫폼입니다. 공개형 K-뷰티 질문 허브(D-SSoT Lite)와 비공개 브랜드 운영 워크스페이스(B-SSoT Builder Lite)를 결합하여 질문에 대한 명확한 답변과 검수, 성과 측정 루프를 제공합니다.

## 2. MVP 목표 범위 (MVP Scope)
제품 출시의 첫 마일스톤(Phase 1, 0~3개월) 타겟입니다.

### 2.1 퍼블릭 공개 영역 (Public)
- **Home (히어로 검색 / 트렌딩 뷰)**: K-뷰티 질문의 통합 검색 공간.
- **Ingredients Hub (성분 백과)**: 성분에 대한 답변형 정리 (Ex. 세라마이드, PDRN).
- **Concerns Hub (고민 백과)**: 민감성, 장벽, 보습 등 고민 중심의 추천 허브.
- **Buyer's Guides**: 섹터별/고민별 Top 5 추천 및 비교 가이드.
- **제품 & 브랜드 Deep-Dive 페이지**: 파편화된 정보를 모은 단일 정답 제공.

### 2.2 브랜드 워크스페이스 영역 (Workspace - B2B)
- **Brand MRI Snapshot**: 외부 유출 없이 내 브랜드 현황을 파악하고 약점/이점을 분석하는 진단 보드.
- **Product Dossier Builder**: AI 기반 문서 초안 검토를 위한 패킷(Dossier) 생성기.
- **Answer Card Builder Lite**: 질문에 대한 최종 "Answer Card(답변 타일)"를 생성 및 저장하는 환경.

## 3. 핵심 디자인/아키텍처 원칙 (Core Principles)
1. **Answer-first**: 모든 UI/UX는 백과사전식 설명이 아닌 하나의 "결론(Answer)" 도출 구조로 설계합니다.
2. **Question-first IA**: 카테고리(화장품 종류) 중심이 아닌 유저의 질문(Question) 구조를 정보 구조의 최상단에 배치합니다.
3. **Trust always visible**: 전문가 검수(reviewedBy), 근거(evidence), 한계점(boundary) 정보를 상시 노출하여 신뢰도를 명시합니다.
4. **No dead-end**: 유저가 막다른 길 없이 항상 다음 질문, 제품 비교, 구매 페이지 등 Action으로 이어지도록 설계합니다.
5. **Human override first**: Gemini API 구동 결과는 항상 초안(Draft)으로 취급하며, 전문가/브랜드 담당자의 승인(human approval)을 거친 후 최종 발행(Published)됩니다.
