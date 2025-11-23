import { GoogleGenAI, Type } from "@google/genai";

// Ensure API key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-compile' });
const MODEL_NAME = 'gemini-2.5-flash';

export const generatePillars = async (coreTopic: string): Promise<string[]> => {
  try {
    const prompt = `
      Act as a world-class content strategist.
      Generate 30 broad Pillar Topics related to the core topic: "${coreTopic}".
      These should be high-level categories suitable for building topical authority.
      Keep titles concise (under 6 words).
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating pillars:", error);
    throw new Error("Failed to generate pillar topics.");
  }
};

export const generateVariations = async (pillar: string, coreTopic: string): Promise<string[]> => {
  try {
    const prompt = `
      Context: Core Topic is "${coreTopic}".
      Selected Pillar: "${pillar}".
      Act as an expert instructional designer.
      Generate 10 specific Lesson Variations or content angles for this pillar.
      These should be distinct, actionable sub-topics suitable for a single lesson or article.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating variations:", error);
    throw new Error("Failed to generate lesson variations.");
  }
};

export const generateQuestions = async (variation: string, pillar: string): Promise<string[]> => {
  try {
    const prompt = `
      Context: Pillar is "${pillar}", Lesson Topic is "${variation}".
      Act as a customer empathy researcher.
      Generate 25 highly relevant Audience Questions that a user would search for or ask about this specific lesson topic.
      Focus on pain points, "how-to" queries, and search intent.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate audience questions.");
  }
};