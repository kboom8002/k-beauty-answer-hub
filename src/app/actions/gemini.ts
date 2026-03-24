'use server'

import { generateJsonResponse } from '@/lib/gemini';

export async function generateQuestionPrescription(productName: string, sector: string) {
  const prompt = `You are a K-Beauty master AI. Analyze the product "${productName}" (Sector: ${sector}) and generate a 'Question Prescription' (Question Ladder). 
  We need exactly 3 core questions that users frequently ask about this type of product, focusing on safety, efficacy, and usage. Make questions sound natural in Korean.`;
  
  const schema = {
    "questions": [
      {
        "id": "q1",
        "questionText": "질문 텍스트 (한국어)",
        "intentType": "효능 / 안전성 / 사용법 등"
      }
    ]
  };

  const data = await generateJsonResponse(prompt, schema);
  return data.questions || [];
}

export async function draftAnswerCard(questionText: string, productContext: string) {
  const prompt = `You are a K-Beauty expert. Draft an Answer Card for the following question about a cosmetic product.
  
  Question: "${questionText}"
  Product Context: ${productContext}
  
  The answer must be evidence-based, concise, and written in professional Korean. It should directly address the user's intent. If there are known side effects or usage caveats, include them in the boundaryText.`;

  const schema = {
    "answerText": "명확하고 전문적인 답변 텍스트 (한국어)",
    "boundaryText": "주의사항 또는 한계점 (해당 없으면 빈 문자열)",
    "confidenceScore": 95,
    "suggestedEvidence": ["관련 논문이나 임상 결과 키워드"]
  };

  return await generateJsonResponse(prompt, schema);
}
