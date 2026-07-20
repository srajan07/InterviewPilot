const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/authMiddleware");
const uploadResume = require("../middleware/uploadResume");

const {
  uploadResume: uploadResumeController,
  getResume,
  deleteResume,
} = require("../controllers/resumeController");

router.post(
  "/",
  verifyJWT,
  uploadResume.single("resume"),
  uploadResumeController
);

router.get(
  "/",
  verifyJWT,
  getResume
);

router.delete(
  "/",
  verifyJWT,
  deleteResume
);

module.exports = router;