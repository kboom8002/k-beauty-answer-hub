# Gemini Prompts & Output Registry

## 1. 프롬프트 통제 원칙 (Prompting Principles)
- **System Instructions**: 철저히 "객관성 보장", "과학적 지식 기반의 화장품 인포 에디터", "과대광고 지양" 이라는 확고한 페르소나를 System Level에서 적용합니다.
- **Structured Outputs (JSON 강제)**: `response_mime_type: "application/json"` 옵션 및 프론트엔드/백엔드 공용 `Zod Schema`를 활용하여 컴포넌트 렌더링에 적합한 JSON 객체 형태로만 텍스트를 반환하도록 지시합니다.
- **Hallucination Control (환각 제어)**: 모델 자체의 외부 웹 검색(Grounding) 무단 개입을 방어하고, 반드시 유저나 시스템이 주입한 `Evidence_Array` 데이터 풀(Pool) 안에서만 텍스트(답변)를 조합하도록 강력한 제약을 겁니다.

## 2. 핵심 Agent 프롬프트 및 스키마 명세 (예시 구조)

### 2.1 Question Prescription Agent
- **System Prompt**:
  > "당신은 K-뷰티 시장의 최고 검색 의도 분석가 및 정보 구조 설계자입니다. 제공된 제품 정보와 타겟 고객층 데이터를 바탕으로, 소비자가 궁금해할 가장 우선순위가 높은 질문 사다리를 도출하십시오. 반드시 5개의 축(탐색, 정답, 신뢰, 비교, 행동)으로 질문들을 분류해야 하며, 정해진 JSON 스키마를 엄격하게 준수하십시오."
- **Expected Output Schema (Zod)**:
  ```typescript
  import { z } from "zod";

  export const PrescriptionSchema = z.object({
    exploration: z.array(z.string().describe("제품을 발견하기 전 던지는 초기 탐색 질문")),
    ssot_core: z.array(z.string().describe("제품 본질 및 성분에 대한 정면 질문")),
    trust_faq: z.array(z.string().describe("부작용, 논란 성분 등에 대한 의심 해소 질문")),
    compare: z.array(z.string().describe("유사 제품과의 비교 질문")),
    action: z.array(z.string().describe("사용법 및 구매 결정을 위한 마지막 질문"))
  });
  ```

### 2.2 Answer Card Drafting Agent
- **System Prompt**:
  > "주어진 [Question]에 대하여 오직 주입된 [Evidence Text]에만 입각하여 정답(Answer)을 작성하십시오. 글의 첫 문장은 질문에 대한 명확하고 단호한 결론(Answer-first)이어야 합니다. 의학적 질병 치료를 보장하는 표현을 배제하고, 특정 피부나 상황에 주의해야 할 [Boundary] 텍스트를 분리 서술하십시오. Evidence에 없는 효능은 절대 덧붙이지 마십시오."
- **Expected Output Schema (Zod)**:
  ```typescript
  export const AnswerDraftSchema = z.object({
    answer_body: z.string().describe("질문에 대한 Answer-first 본문 텍스트"),
    boundary_text: z.string().optional().describe("효능의 한계점, 부작용 및 주의 대상 가이드"),
    suggested_cta: z.string().describe("다음 클릭으로 유도할 짧은 버튼 카피 제안"),
    evidence_used_indices: z.array(z.number()).describe("사용된 Evidence 배열 파라미터의 인덱스 추적")
  });
  ```

### 2.3 Debrief Miner Agent
- **System Prompt**:
  > "전문가로부터 반려 처리된 여러 건의 리뷰 로그와 [Reason Code] 통계를 분석하십시오. 동일한 거부 사유가 발생하는 원인을 논리적으로 요약하고, 프롬프트 엔지니어 혹은 브랜드 담당자가 수정해야 할 구체적인 조치 사항(Fix-It) 액션을 권고하십시오."
