const Question = require("../models/questionSchema");

async function createQuestion(req,res){
    const {title,description,difficulty,category}=req.body;
    if(!title || !description || !difficulty || !category){
        return res.status(400).json({
            message:"All feilds are required"
        })
    }
    try{
   const existQues=await Question.findOne({title});
   if(existQues){
    return res.status(400).json({
        message:"Question already exist"
    })
   }
   await Question.create({
      title,
      description,
      difficulty,
      category,
   });
   return res.status(201).json("Question created");
}
catch(error){
    return res.status(500).json({
     messaage:"Internal server error"
    })
}
}
async function readQuestion(req,res){
  const questions= await Question.find();

  if (questions.length === 0){
    return res.status(404).json("Question not founded");
  }
 return res.json({
    title:questions.title,
    description:questions.description,
    difficulty:questions.difficulty,
    category:questions.category,
 });
}

module.exports={
    createQuestion,
    readQuestion,
}