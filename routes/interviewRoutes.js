const express = require("express");

const router = express.Router();

const {
  startInterview,
  submitAnswer,
  getDashboard,
} = require("../controllers/interviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/start",
  authMiddleware,
  startInterview
);

router.post(
  "/submit-answer",
  authMiddleware,
  submitAnswer
);

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

module.exports = router;