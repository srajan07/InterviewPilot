class AppError extends Error{
   constructor(message,StatusCode){
    super(message);
    this.StatusCode=StatusCode;
    this.isOperational = true;
   }
  
}
module.exports=AppError;