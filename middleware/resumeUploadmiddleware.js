const multer=require("multer");

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"upload/resume/");
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname);
  },
})
const uploadResume=multer({
    storage,
    fileFilter:function(req,file,cb){
          const allowed=["application/pdf"];
          if(allowed.includes(file.mimetype)){
            cb(null,true);
          }
          else{
            cb(new Error("Only Pdf allowed"));
          }
        },
        limits:{
           fileSize: 5*1024*1024,
        }
})
module.exports = uploadResume;
