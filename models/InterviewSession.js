const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    expectedAnswer: {
      type: String,
      default: "",
    },
     evaluationStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },
    userAnswer: {
      type: String,
      default: "",
    },

    aiFeedback: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    isAnswered: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);
const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: [
        "frontend",
        "backend",
        "AI Engineer",
        "Data Analyst",
      ],
    },

    interviewType: {
      type: String,
      required: true,
      enum: ["technical"],
      default: "technical",
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    language: {
      type: String,
      required: true,
      enum: ["C++", "Java", "Python"],
      default: "C++",
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      default: 30,
    },

    status: {
      type: String,
      enum: ["ongoing", "completed", "cancelled"],
      default: "ongoing",
    },

    questions: [questionSchema],

    currentQuestion: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);