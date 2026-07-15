const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
    
});

const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
      const allowed=[
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp"
      ];
      if(allowed.includes(file.mimetype)){
        cb(null, true);
      }
      else{
        cb(new Error("Only PNG, JPG, JPEG and WEBP images are allowed"));
      }
    },
    limit:{
        fileSize:2*1024*1024
    }
});

module.exports = upload;