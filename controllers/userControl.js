const AppError = require("../utils/AppError");
const fs = require("fs");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userSchema");
const ApiResponse = require("../utils/ApiResponse");
const updateProfileImage=asyncHandler(async(req,res)=>{
    if(!req.file){
   throw new AppError("Profile image is required", 400);
} 
try{
   const result=await cloudinary.uploader.upload(req.file.path);

   const user=await User.findById(req.user.id);
   if(!user) throw new AppError("User not found",404);

   if(user.profileImagePublicId)await cloudinary.uploader.destroy(user.profileImagePublicId);

   user.profileImage=result.secure_url;
   user.profileImagePublicId = result.public_id;
  
   await user.save();
}
  finally{
    await fs.promises.unlink(req.file.path);//delete the local file from disk
  }
   res.status(200).json(
    new ApiResponse(
        200,
        user,
        "Image uploaded successfully"
    )
   )
})

module.exports=updateProfileImage;