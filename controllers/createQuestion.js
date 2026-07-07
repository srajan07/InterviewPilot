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
  const question= await Question.create({
      title,
      description,
      difficulty,
      category,
   });
   return res.status(201).json({
    message:"Question created successfully",
    question,
   });
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
 return res.status(200).json(questions);
}
//update the question
async function updateQues(req,res){
    const {id} =req.params ;
    const data = req.body;
    const updateq = await Question.findByIdAndUpdate(id,data,{new :true}); 
    if(!updateq){
        return res.status(404).json({
            message:"Question not founded"
        })
    }
    return res.status(200).json({
        message:"Question updated Succesfully",
        question:updateq

    });
}
async function deleteQues(req,res){
    const {id}=req.params;
    const deleteq=await Question.findByIdAndDelete(id);
    if(!deleteq){
        return res.status(404).json({
        message:"Internal sever error",
    })
    }
    return res.status(200).json({
            message:"delete question successfully",

        })
}
module.exports={
    createQuestion,
    readQuestion,
    updateQues,
    deleteQues,
}