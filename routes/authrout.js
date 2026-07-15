const express=require("express");
const authMiddleware=require("../middleware/authMiddle");
const adminMiddleware=require("../middleware/adminMiddleware");
const questionValidation=require("../validation/questionValidation");
const {loginUser} =require("../controllers/authcontrol");
const { createQuestion, readQuestion,updateQues,deleteQues } = require("../controllers/createQuestion");
const router=express.Router();
router.post("/login",loginUser);
router.post("/questions",authMiddleware,adminMiddleware,questionValidation,createQuestion);
// router.post(
//     "/profile",
//     upload.single("image"),
//     updateProfile
// );
// router.put(
//     "/profile/image",
//     authMiddleware,
//     upload.single("profileImage"),
//     updateProfileImage
// );
router.get("/questions/:id",authMiddleware,readQuestion);
router.put("/questions/:id",authMiddleware,adminMiddleware,questionValidation,updateQues);
router.delete("/questions/:id",authMiddleware,adminMiddleware,deleteQues);
module.exports=router;