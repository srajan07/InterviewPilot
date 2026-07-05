const express=require("express");
const authMiddleware=require("../middleware/authMiddle");
const adminMiddleware=require("../middleware/adminMiddleware");
const {loginUser} =require("../controllers/authcontrol");
const { createQuestion } = require("../controllers/createQuestion");
const router=express.Router();
router.post("/login",login);
router.post("/questions",authMiddleware,adminMiddleware,createQuestion);
module.exports=router;