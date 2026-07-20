const InterviewSession = require("../models/InterviewSession");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const ApiResponse = require("../utils/ApiResponse");
const dummyQuestions = require("../utils/dummyQuestions");
const { evaluateAnswer } = require("../services/aiService");

const startInterview = asyncHandler(async (req, res) => {
  const { role, difficulty, language, totalQuestions, duration } = req.body;

  if (!role || !difficulty || !language || !totalQuestions || !duration) {
    throw new AppError("All fields are required", 400);
  }

  const selectedQuestions = dummyQuestions.slice(0, Number(totalQuestions));

  const interviewSession = await InterviewSession.create({
    user: req.user._id,
    role,
    interviewType: "technical",
    difficulty,
    language,
    totalQuestions,
    duration,
    questions: selectedQuestions,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        sessionId: interviewSession._id,
        question: {
          questionIndex: 0,
          question: interviewSession.questions[0].question,
        },
      },
      "Interview started successfully"
    )
  );
});

const submitAnswer = asyncHandler(async (req, res) => {
  const { sessionId, questionIndex, userAnswer } = req.body;

  if (!sessionId || questionIndex === undefined || !userAnswer) {
    throw new AppError(
      "sessionId, questionIndex and userAnswer are required",
      400
    );
  }

  const interSession = await InterviewSession.findById(sessionId);

  if (!interSession) {
    throw new AppError("Interview session not found", 404);
  }

  if (interSession.user.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized to access this session", 403);
  }

  const currentQuestion = interSession.questions[questionIndex];

  if (!currentQuestion) {
    throw new AppError("Invalid question index", 400);
  }

  if (currentQuestion.isAnswered) {
    throw new AppError("This question has already been answered", 400);
  }

  // -----------------------------
  // Save answer immediately
  // -----------------------------
  currentQuestion.userAnswer = userAnswer;
  currentQuestion.isAnswered = true;
  currentQuestion.evaluationStatus = "pending";

  const nextIndex = questionIndex + 1;
  const completed = nextIndex >= interSession.questions.length;

  if (completed) {
    interSession.status = "completed";
    interSession.completedAt = new Date();
  } else {
    interSession.currentQuestion = nextIndex;
  }

  // Save answer before AI
  await interSession.save();

  // -----------------------------
  // AI Evaluation
  // -----------------------------
  try {
    const evaluation = await evaluateAnswer(
      currentQuestion.question,
      currentQuestion.expectedAnswer,
      userAnswer
    );

    currentQuestion.score = evaluation.score;
    currentQuestion.aiFeedback = evaluation.feedback;
    currentQuestion.evaluationStatus = "completed";

    await interSession.save();
  } catch (error) {
    console.error("AI Evaluation Failed:", error.message);

    currentQuestion.evaluationStatus = "failed";

    await interSession.save();

    // Don't throw error.
    // User's answer is already stored.
  }

  const responsePayload = {
    sessionId: interSession._id,
    completed,
  };

  if (!completed) {
    responsePayload.nextQuestion = {
      questionIndex: nextIndex,
      question: interSession.questions[nextIndex].question,
    };
  } else {
    responsePayload.message = "Interview completed successfully.";
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      responsePayload,
      "Answer submitted successfully"
    )
  );
});

module.exports = {
  startInterview,
  submitAnswer,
};