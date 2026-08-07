const InterviewSession = require("../models/InterviewSession");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const ApiResponse = require("../utils/ApiResponse");
const dummyQuestions = require("../utils/dummyQuestions");
const mongoose = require("mongoose");

const {
  evaluateAnswer,
  generateInterviewReport,
  generateInterviewQuestions,
} = require("../services/aiService");

const startInterview = asyncHandler(async (req, res) => {
  const { role, difficulty, language, totalQuestions, duration } = req.body;

  if (!role || !difficulty || !language || !totalQuestions || !duration) {
    throw new AppError("All fields are required", 400);
  }

  let selectedQuestions;

  try {
    selectedQuestions = await generateInterviewQuestions(
      role,
      difficulty,
      language,
      totalQuestions
    );
  } catch (error) {
    console.error("AI Question Generation Failed:", error.message);

    // Fallback to dummy questions
    selectedQuestions = dummyQuestions.slice(0, Number(totalQuestions));
  }

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

  // Save user's answer immediately
  currentQuestion.userAnswer = userAnswer;
  currentQuestion.isAnswered = true;
  currentQuestion.evaluationStatus = "pending";

  await interSession.save();

  // AI Evaluation
  try {
    const evaluation = await evaluateAnswer(
      currentQuestion.question,
      currentQuestion.expectedAnswer,
      userAnswer
    );

    currentQuestion.score = evaluation.score;
    currentQuestion.aiFeedback = evaluation.feedback;
    currentQuestion.evaluationStatus = "completed";
  } catch (error) {
    console.error("AI Evaluation Failed:", error.message);

    currentQuestion.score = 0;
    currentQuestion.aiFeedback = "AI evaluation unavailable.";
    currentQuestion.evaluationStatus = "failed";
  }

  const nextIndex = questionIndex + 1;
  const completed = nextIndex >= interSession.questions.length;

  if (!completed) {
    interSession.currentQuestion = nextIndex;
  } else {
    interSession.status = "completed";
    interSession.completedAt = new Date();

    const totalScore = interSession.questions.reduce(
      (sum, question) => sum + (question.score || 0),
      0
    );

    const overallScore = Math.round(
      totalScore / interSession.questions.length
    );

    try {
      const report = await generateInterviewReport(
        interSession.questions
      );

      interSession.report = {
        overallScore,
        strengths: report.strengths,
        weaknesses: report.weaknesses,
        recommendation: report.recommendation,
      };
    } catch (error) {
      console.error(
        "Interview Report Generation Failed:",
        error.message
      );

      interSession.report = {
        overallScore,
        strengths: [],
        weaknesses: [],
        recommendation:
          "Interview report could not be generated.",
      };
    }
  }

  // Save everything once
  await interSession.save();

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
const getInterviewHistory = asyncHandler(async (req, res) => {
  const interviews = await InterviewSession.find({
    user: req.user._id,
  })
    .select(
      "role difficulty status report.overallScore completedAt createdAt"
    )
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      interviews,
      "Interview history fetched successfully"
    )
  );
});

const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await InterviewSession.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $group: {
        _id: null,

        totalInterviews: {
          $sum: 1,
        },

        completedInterviews: {
          $sum: {
            $cond: [
              { $eq: ["$status", "completed"] },
              1,
              0,
            ],
          },
        },

        averageScore: {
          $avg: "$report.overallScore",
        },

        bestScore: {
          $max: "$report.overallScore",
        },
      },
    },
  ]);

  const stats = dashboard[0] || {
    totalInterviews: 0,
    completedInterviews: 0,
    averageScore: 0,
    bestScore: 0,
  };

  if (stats.averageScore) {
    stats.averageScore = Math.round(stats.averageScore);
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      stats,
      "Dashboard fetched successfully"
    )
  );
});

module.exports = {
  startInterview,
  submitAnswer,
  getInterviewHistory,
  getDashboard,
};