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
    res.status(500).json("Error");
    console.log(error);
}

    
}
function login(req,res){
    res.send("Login Controller ");
}
module.exports={
    registerUser,
    login,
};