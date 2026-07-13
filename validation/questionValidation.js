const Joi = require("joi");
 const questionSchema=  Joi.object({
            title: Joi.string().required().min(5).max(100),
          description: Joi.string().required().min(10).max(1000),
          difficulty:Joi.string().required().valid("easy","medium","hard"),
          category:Joi.string().required().valid("Backend","DSA","Hr","Frontend","Database"),
          
        })
function questionValidation(req,res,next){
        const {error,value}=questionSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                message:error.details[0].message,
            });
        }
        next();
}
module.exports={
    questionValidation,
}