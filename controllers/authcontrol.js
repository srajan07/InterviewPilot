const jwt=require("jsonwebtoken");
const User= require("../models/User");
const bcrypt=require("bcrypt");
const generateOtp = require("../utils/otpGenerator");
const ApiResponse = require("../utils/ApiResponse");
const AppError=require("../utils/AppError");
const asyncHandler=require("../utils/asyncHandler");
const emailService = require("../services/emailServices");

async function registerUser(req,res){
    const {fullName,email,password}=req.body;
    if(!fullName || !email||! password){
        return res.status(400).json("All fields are Required")
    }
   
    try{
        const existingUser= await User.findOne({email});
   if(existingUser){
    return res.status(409).json("Email already exist");
   }
   const hashPassword= await bcrypt.hash(password,10); 
   await User.create({
    fullName,
    email,
    password:hashPassword,
   });
   
    res.status(201).json("User registered successfully");
}
catch(error){
    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error"
    });
}

}
        // Login
async function loginUser(req,res){
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json("All feilds are required");
    }
    try{
        const existUser=await User.findOne({email});
        if(!existUser) return res.status(401).json("Invalid email or password");
        const Ismatch=await bcrypt.compare(password,existUser.password);
        if(!Ismatch) return res.status(401).json("Invalid email or password");
       const token =  jwt.sign({
             id:existUser._id,
             role:existUser.role,
        
        }, process.env.JWT_TOKEN,
    {
         expiresIn:"7d"
    })
  return res.status(200).json({
    message:"Successfully Login",
    token:token,
    });

    }
    catch(error){
        
        return res.status(500).json({
            message:"Server internal error"
    });
        
    }

}
async function getProfile(req,res){
    const user= await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
   return res.json({
        fullName: user.fullName,
    email: user.email,
    role: user.role
    });
}
const forgetPassword=asyncHandler(async(req,res)=>{
   const{email}=req.body;
   if(!email) throw new AppError("Enter the email first",400);

   const emailverify=await User.findOne({email});
   if(!emailverify) throw new AppError ("User not exits",404);
  
   const otp =generateOtp();
   emailverify.resetPasswordOtp=otp;
   emailverify.resetPasswordOtpExpires=new Date(Date.now()+5*60*1000);
 
   await emailverify.save(); 
   await emailService.sendOtpEmail(email,otp);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "OTP sent successfully",
        )
    );

})
const verifyOtp=asyncHandler(async(req,res)=>{
    const {email,otp}=req.body;
   if(!email || !otp) throw new AppError("Email and OTP are required",400);

   const emailverify=await User.findOne({email});
   if(!emailverify) throw new AppError ("User not exits",404);
    
   if(otp !== emailverify.resetPasswordOtp)throw new AppError("Otp not matched",400);

   
   if(Date.now() > emailverify.resetPasswordOtpExpires) throw new AppError("time expired",400);

   return res.status(200).json(
    new ApiResponse(
        200,
        null,
        "OTP verified successfully"
    )
   );

});
const resetPassword=asyncHandler(async(req,res)=>{
    const{email,otp,newPassword}=req.body;
 if(!email || !otp || !newPassword) throw new AppError("Email and newPassword are required",400);

 const user=await User.findOne({email});
 if (!user)throw new AppError("User not found",404);

if(otp !== user.resetPasswordOtp)throw new AppError("Otp not matched",400);
if(Date.now() > user.resetPasswordOtpExpires) throw new AppError("OTP expired",400);

    const hasPass=await bcrypt.hash(newPassword,10);
    user.password = hasPass;

    user.resetPasswordOtp=undefined;
    user.resetPasswordOtpExpires=undefined;

    await user.save();

    return res.status(200).json(
    new ApiResponse(
        200,
        null,
        "Password reset successfully"
    )
   );

})
module.exports={
    registerUser,
    loginUser,
    getProfile,
    forgetPassword,
    verifyOtp,
    resetPassword,
};