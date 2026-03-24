import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Default model
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Basic text generation
 */
export async function generateText(prompt: string) {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set.");
  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * JSON generation with fallback regex parsing
 */
export async function generateJsonResponse(prompt: string, schema: any) {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set.");
  
  const modelSchema = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // We force the model to output JSON
    generationConfig: {
      responseMimeType: "application/json",
    }
  });
  
  const enhancedPrompt = `${prompt}\n\nPlease output ONLY raw JSON that strictly matches this structure. Do not include markdown decorators like \`\`\`json:\n${JSON.stringify(schema, null, 2)}`;
  
  const result = await modelSchema.generateContent(enhancedPrompt);
  const responseText = result.response.text();
  
  try {
    // Clean up potential markdown blocks if the model ignores the prompt
    const cleanedText = responseText.replace(/```json\n|```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("Failed to parse Gemini JSON output:", responseText);
    throw new Error("Invalid structure returned by AI.");
  }
}
