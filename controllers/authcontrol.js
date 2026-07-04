const jwt=require("jsonwebtoken");
const User= require("../models/User");
const bcrypt=require("bcrypt");

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
module.exports={
    registerUser,
    loginUser,
    getProfile,
};