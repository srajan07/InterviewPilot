function authMiddleware(req,res,next){
    const auth=req.headers.authorization;
    if(!auth) return res.status(401).json("No token provided");
     const token=auth.split(" ")[1];
    
   try {
    const decoded=  jwt.verify(token,process.env.JWT_TOKEN);
     req.user=decoded;
         next();
   }
 catch (error) {
     return res.status(401).json({
            message:"Token is expired or missing"
        })
   }

}