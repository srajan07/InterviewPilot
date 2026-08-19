const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const verifyJWT = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", verifyJWT, getProfile);
// Protected Route
router.post("/logout", verifyJWT, logout);

module.exports = router;