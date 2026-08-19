const express = require("express");
const router = express.Router();
const upload=require("../middleware/resumeUploadmiddleware");
const {
    getProfile,
    updateProfile,
    updateProfileImage,
} = require("../controllers/userController");

const verifyJWT = require("../middleware/authMiddleware");

router.get("/me", verifyJWT, getProfile);

router.put("/me", verifyJWT, updateProfile);
 router.put(
    "/me/image",
    verifyJWT,
    upload.single("profileImage"),
    updateProfileImage
);

module.exports = router;