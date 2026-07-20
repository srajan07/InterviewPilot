const { GoogleGenAI } = require("@google/genai");
const AppError = require("../utils/AppError");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const evaluateAnswer = async (question, expectedAnswer, userAnswer) => {
  const prompt = `
You are a senior software engineer interviewing a candidate.

Question:
${question}

Expected Answer:
${expectedAnswer}

Candidate Answer:
${userAnswer}

Evaluate the candidate fairly.

Assign an integer score between 0 and 10.

Give short constructive feedback.

Return ONLY valid JSON.

Do not include markdown.
Do not wrap JSON inside \`\`\`.
Do not explain anything.
Return exactly one JSON object in this format:

{
  "score": number,
  "feedback": "string"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text || "";

    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanedText);

    if (
      typeof result.score !== "number" ||
      result.score < 0 ||
      result.score > 10
    ) {
      throw new AppError("Invalid AI score", 500);
    }

    if (
      typeof result.feedback !== "string" ||
      result.feedback.trim() === ""
    ) {
      throw new AppError("Invalid AI response", 500);
    }

    return {
      score: Math.round(result.score),
      feedback: result.feedback.trim(),
    };
  } catch (error) {
    console.error("Gemini Error:", error.message);

    throw new AppError("Failed to evaluate answer using Gemini", 500);
  }
};

module.exports = {
  evaluateAnswer,
};