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
const generateInterviewReport = async (questions) => {
  const interviewSummary = questions
    .map((question, index) => {
      return `
Question ${index + 1}

Question:
${question.question}

Candidate Answer:
${question.userAnswer}

Score:
${question.score}/10

AI Feedback:
${question.aiFeedback}
`;
    })
    .join("\n\n");

  const prompt = `
You are a senior software engineer conducting a technical interview.

Below is the complete interview summary.

${interviewSummary}

Analyze the candidate's overall interview performance.

Return ONLY valid JSON.

Do not include markdown.
Do not wrap JSON inside \`\`\`.
Do not explain anything.

Return exactly one JSON object in this format:

{
  "strengths": [
    "strength 1",
    "strength 2"
  ],
  "weaknesses": [
    "weakness 1",
    "weakness 2"
  ],
  "recommendation": "Short recommendation"
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

    if (!Array.isArray(result.strengths)) {
      throw new AppError("Invalid strengths returned by AI", 500);
    }

    if (!Array.isArray(result.weaknesses)) {
      throw new AppError("Invalid weaknesses returned by AI", 500);
    }

    if (
      typeof result.recommendation !== "string" ||
      result.recommendation.trim() === ""
    ) {
      throw new AppError("Invalid recommendation returned by AI", 500);
    }

    return {
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      recommendation: result.recommendation.trim(),
    };
  } catch (error) {
    console.error("Gemini Report Error:", error.message);

    throw new AppError("Failed to generate interview report", 500);
  }
};
const generateInterviewQuestions = async (
  role,
  difficulty,
  language,
  totalQuestions
) => {
   const prompt = `
You are a senior software engineer.

Generate ${totalQuestions} technical interview questions.

Role:
${role}

Difficulty:
${difficulty}

Programming Language:
${language}

Each question must include:

- question
- expectedAnswer

Return ONLY valid JSON.

Do not include markdown.
Do not wrap JSON inside \`\`\`.

Return this format:

[
  {
    "question":"...",
    "expectedAnswer":"..."
  }
]
`;
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});
if (!Array.isArray(result)) {
    throw new AppError("Invalid AI response", 500);
}
for (const item of result) {
  if (
    !item.question ||
    !item.expectedAnswer
  ) {
    throw new AppError("Invalid AI question format", 500);
  }
}
return result;
};
module.exports = {
  evaluateAnswer,
  generateInterviewReport,
  generateInterviewQuestions,
};