const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
   fullName:{
        type:String,
        required : true,
        trim : true,
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        unique:true,
        required: true,
    },
    role:{
        type:String,
        default:"student",

    },
    password:{
       type:String,
       required:true,
    },
    

},{
    timestamps:true,
});
const User=mongoose.model("User",userSchema);
module.exports=User;