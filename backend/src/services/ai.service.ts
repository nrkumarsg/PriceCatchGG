import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const normalizeProductName = async (input: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Convert the following user input into a clean, structured industrial product name for search. 
    Remove unnecessary adjectives and keep the model number/brand if present. 
    Input: "${input}"
    Output:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini normalization error:", error);
    return input; // Fallback to original input
  }
};
