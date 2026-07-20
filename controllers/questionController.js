const Question = require("../models/questionSchema");
const asyncHandler=require("../utils/asyncHandler");
const AppError=require("../utils/AppError");
const ApiResponse=require("../utils/ApiResponse");

const  createQuestion = asyncHandler(async(req,res)=>{
const {title,description,difficulty,category}=req.body;
const existQues=await Question.findOne({title});
   if(existQues){
    throw new AppError("Question already exist",404);
   }
  const question= await Question.create({
      title,
      description,
      difficulty,
      category,
      createdBy:req.user.id
   });
   return res.status(201).json(
    new ApiResponse(
        201,
        question,
        "Question Created Succesfully",
    )
   );
});
const readQuestion = asyncHandler(async(req,res)=>{
   const{difficulty,category,search,sort}=req.query;
   const page = Number(req.query.page)||1;
   const limit =Number(req.query.limit)||10;

   const skip=(page-1)*limit;
   const filter={};
   if(difficulty)filter.difficulty=difficulty;
   if(category)filter.category=category;

   if(search){
    filter.title={
        $regex:search,
        $options:"i",
    }
   }
   let sortOption={createdAt:-1};
   if(sort === "newest") sortOption = {createdAt : -1};
   else if(sort === "oldest") sortOption= {createdAt : 1};

  const questions= await Question.find(filter).sort(sortOption).skip(skip).limit(limit);

  const totalQuestions= await Question.countDocuments(filter);
  const totalPages= Math.ceil(totalQuestions/limit);
  const hasNextPage=page<totalPages;
  const hasPreviousPage=page>1;
 return res.status(200).json(
    new ApiResponse(
    200,
    {
    questions,
    currentPage:page,
    totalPages,
    totalQuestions,
    hasNextPage,
    hasPreviousPage,
 },
 "Questions Fetched SuccessFully"
)
);
});
//update the question
const updateQues=asyncHandler(async(req,res)=>{
    const {id} =req.params ;
    const data = req.body;
    const updateq = await Question.findByIdAndUpdate(id,data,{new :true}); 
    if(!updateq){
        throw new AppError("Question not found", 404);
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            updateq,
            "Question updated Succesfully"
        )
    )
});
const deleteQues=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const deleteq=await Question.findByIdAndDelete(id);
    if(!deleteq)throw new AppError("Question not found",404);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "delete question successfully",
        )
    );
});

module.exports={
    createQuestion,
    readQuestion,
    updateQues,
    deleteQues,
}