const AppError = require("../utils/AppError");
const fs = require("fs");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const ApiResponse = require("../utils/ApiResponse");


const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Profile image is required", 400);
  }

  let user; 

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    user = await User.findById(req.user.id);
    if (!user) throw new AppError("User not found", 404);

    if (user.avatar?.publicId) {
      await cloudinary.uploader.destroy(user.avatar.publicId);
    }

    user.avatar.url = result.secure_url;
    user.avatar.publicId = result.public_id;

    await user.save();
  } finally {
    await fs.promises.unlink(req.file.path); 
  }

  return res.status(200).json(
    new ApiResponse(200, user, "Image uploaded successfully")
  );
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return res.status(200).json(
    new ApiResponse(200, user, "Profile fetched successfully")
  );
});
const updateProfile=asyncHandler(async(req,res)=>{
  const allowedUpdates = [
  "fullName",
  "bio",
  "college",
  "graduationYear",
  "preferredRole",
  "experienceLevel",
  "skills",
  "github",
  "linkedin",
  "portfolio",
];
const updates={};
allowedUpdates.forEach((field)=>{
   if(req.body[field]!== undefined){
      updates[field]=req.body[field];
   }

})
const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    {
        new: true,
        runValidators: true,
    }
);
if (!user) {
    throw new AppError("User not found", 404);
}

return res.status(200).json(
    new ApiResponse(
        200,
        user,
        "Profile updated successfully"
    )
);
})

module.exports = {
  updateProfileImage,
  getProfile,
  updateProfile,
};