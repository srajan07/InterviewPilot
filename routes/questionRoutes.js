const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const authorizeRole=require("../middleware/authorizeRole");
const questionValidation=require("../validation/questionValidation");
const { createQuestion, readQuestion,updateQues,deleteQues } = require("../controllers/questionController");
const router=express.Router();
router.post("/",authMiddleware,authorizeRole("admin"),questionValidation,createQuestion);
router.get("/:id",authMiddleware,readQuestion);
router.put("/:id",authMiddleware,authorizeRole("admin"),questionValidation,updateQues);
router.delete("/:id",authMiddleware,authorizeRole("admin"),deleteQues);

module.exports=router;