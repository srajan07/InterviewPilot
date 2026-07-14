const cloudinary = require("../config/cloudinary");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const userControl=asyncHandler(async(req,res)=>{
//upload image
const result= await cloudinary.uploader.upload(
    req.file.path
);
//create user
const user = await User.create({
    name:req.body.name,
    email:req.body.email,
    profileImage:result.secure_url
});
return res.status(201).json(
    new ApiResponse(
    201,
    user,
    "User created Successfully",
    )
);
});
module.exports=userControl;