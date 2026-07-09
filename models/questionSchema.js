const mongoose = require('mongoose');
const questionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:true,
        default:"easy",
        trim:true,
    },
    category:{
        type:String,
        required:true,
        default:"backend",
        trim:true,
    },
    createdBy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true,
    },
},{
    timestamps:true,
});
module.exports= mongoose.model("Question",questionSchema);