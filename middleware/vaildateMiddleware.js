function validateQuestion(req,res,next){
    const {title,description,difficulty,category}=req.body;
    if(!title || !description  || !difficulty ||  !category){
        return res.status(400).json({
            message:"All feilds are required"
        })
    }
   const validDifficulties = ["easy", "medium", "hard"];

if (!validDifficulties.includes(difficulty)) {
    return res.status(400).json({
        message: "Difficulty must be easy, medium or hard"
    });
}
    const validCategories=["Dsa","Backend","Frontend","Hr","Database"];
    if(!validCategories.includes(category)){
         return res.status(400).json({
            message:"category must be Dsa,backend,frontenf,hr,database"
         })
    }
    next();
}
module.exports = validateQuestion;