const express = require("express");
const router = express.Router();

const { startInterview, submitAnswer } = require("../controllers/interviewController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/start", authMiddleware, startInterview);
router.post("/submit-answer", authMiddleware, submitAnswer);

module.exports = router;