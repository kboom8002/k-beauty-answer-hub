# Gemini Agents Workflow Specification

## 1. 개요
K-Beauty Answer Hub OS v1의 AI 레이어는 구글 Gemini API를 기반으로 구동되며, 각 기능별로 세분화된 약 10개의 "Agent"들이 비동기(Asynchronous) 파이프라인 파츠로 연결되어 동작합니다. AI의 생성물은 자동 발행되지 않으며, 항상 **"Draft(초안)"** 상태로 저장되어 사람(브랜드 담당자 혹은 전문가)의 검수(Human-in-the-loop)를 거치도록 강제됩니다.

## 2. Public Hub Agents (공개 파트 지원)
- **Search Intent Summarizer**
  - **역할**: 유저의 다중 검색 쿼리를 문맥적으로 이해하고, 단순 키워드 매칭을 넘어서 "질문의 의도(Intent)" 차원으로 묶어 요약된 검색 헤더를 구성합니다.
  - **트리거**: 홈/검색 페이지에서 유저가 복잡한 자연어 쿼리를 발생시킬 때.
- **Buyer’s Guide Draft Assistant**
  - **역할**: 카테고리 내 속한 Top 5 제품군의 스펙을 비교 분석하고, "누구에게 가장 추천하는가(Best For) / 누구는 피해야 하는가(Not For)" 구조의 가상 가이드를 자동 초안화합니다.

## 3. Workspace B2B Agents (브랜드 영토 확장 및 자산 구축 지원)
브랜드의 AEO 권위를 구축하기 위한 중추적 에이전트 그룹입니다.
- **Question Prescription Agent (질문 처방 에이전트)**
  - **역할**: 특정 제품과 시장 카테고리를 분석해 유저가 던질 법한 연쇄 질문 트리 (탐색/정본/트러스트/비교/행동 5축 기반) 사다리를 처방(Prescribe)합니다.
- **Product Dossier Builder**
  - **역할**: 흩어진 제품 성분, 클레임, 한계점 데이터를 모아 전문가(Reviewer)가 빠른 시간 안에 깊이 있는 검토를 할 수 있는 압축 패킷(Dossier)을 생성합니다.
- **Answer Card Drafting Agent / Trust FAQ Builder**
  - **역할**: 메인 핵심. 질문 하나에 대해 제공된 의학적 근거(Evidence) 안에서만 결론을 도출하여 카드형 답변 초안과 면책 조항(Boundary)을 작성합니다.
- **Compare Card Generator**
  - **역할**: 자사 제품과 타사(혹은 기존 라인) 제품의 전성분과 타겟을 추출하여 차이점 매트릭스와 비교표를 생성합니다.

## 4. Operations & Expert System (검수 및 보완 운영 AI)
- **Review / Consensus Draft Assistant**
  - **역할**: 하나의 Asset에 여러 리뷰어가 파편화된 의견을 달았을 때, 이들의 동의점과 불일치점을 묶어(Consensus) 최종 위원회 합의문 초안을 작성해냅니다.
- **Debrief Miner & Fix-It Composer**
  - **역할**: 반려(Reject)가 잦은 카드들의 Reason Code를 마이닝하여 반복적인 제품 설명 오류나 프롬프트 과장 광고 패턴을 찾고(Debrief), 운영자에게 시스템 프롬프트 업데이트(Patch)나 콘텐츠 수정 권고안(Fix-It)을 제시합니다.
