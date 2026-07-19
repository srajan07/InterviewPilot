const Resume=require("../models/resumeSchema");
const AppError = require("../utils/AppError");
const fs = require("fs");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const ApiResponse = require("../utils/ApiResponse");

const uploadResume=asyncHandler(async(req,res)=>{
  if(!req.file) throw new AppError("File are required",400);
  let resume;
  try{
    const result=await cloudinary.uploader.upload(req.file.path,{ resource_type: "raw" });
    resume = await Resume.findOne({user: req.user.id});

    if (!resume) {
    resume = new Resume({user: req.user.id});
     }
   
    const oldPublicId = resume?.resume?.publicId;
    resume.resume = {
    url: result.secure_url,
    publicId: result.public_id,
   };
    await resume.save();
   if (oldPublicId) {
     await cloudinary.uploader.destroy(oldPublicId, { resource_type: "raw" });
   }
  }
  finally{
     await fs.promises.unlink(req.file.path);
  }
  return res.status(200).json(new ApiResponse(200,resume,"Resume uploaded"));
});
const getResume = asyncHandler(async(req,res)=>{
   
});
const deleteResume = asyncHandler(async(req,res)=>{

});
module.exports={
    uploadResume,
    getResume,
    deleteResume,
}