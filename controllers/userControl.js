const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userSchema");
const ApiResponse = require("../utils/ApiResponse");
const updateProfileImage=asyncHandler(async(req,res)=>{
    if(!req.file){
   throw new AppError("Profile image is required", 400);
} 
  const result=await cloudinary.uploader.upload(req.file.path);
  await fs.promises.unlink(req.file.path);
   if(!user) throw new AppError("User not found",404);
   const user=await User.findById(req.user.id);

  if(user.profileImagePublicId)await cloudinary.uploader.destroy(user.profileImagePublicId);

   user.profileImage=result.secure_url;
   user.profileImagePublicId = result.public_id;
  

   await user.save();

   res.status(200).json(
    new ApiResponse(
        200,
        user,
        "Image uploaded successfully"
    )
   )
})
module.exports=updateProfileImage;