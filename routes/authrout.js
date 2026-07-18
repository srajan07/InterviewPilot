const express=require("express");
const authMiddleware=require("../middleware/authMiddle");
const authorizeRole=require("../middleware/authorizeRole");
const questionValidation=require("../validation/questionValidation");
const {loginUser} =require("../controllers/authcontrol");
const { createQuestion, readQuestion,updateQues,deleteQues } = require("../controllers/createQuestion");
const router=express.Router();
router.post("/login",loginUser);
router.post("/questions",authMiddleware,authorizeRole("admin"),questionValidation,createQuestion);
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
router.put("/questions/:id",authMiddleware,authorizeRole("admin"),questionValidation,updateQues);
router.delete("/questions/:id",authMiddleware,authorizeRole("admin"),deleteQues);
module.exports=router;