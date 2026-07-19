const express = require("express");
const router = express.Router();
const upload=require("../middleware/uploadMiddleware");
const {
    getProfile,
    updateProfile,
    updateProfileImage,
} = require("../controllers/userController");

const verifyJWT = require("../middleware/authmiddleware");

router.get("/me", verifyJWT, getProfile);

router.put("/me", verifyJWT, updateProfile);
 router.put(
    "/me/image",
    verifyJWT,
    upload.single("profileImage"),
    updateProfileImage
);

module.exports = router;