require("dotenv").config();
const express=require("express");
const cookieParser = require("cookie-parser");
const app=express();
const authrout=require("./routes/authroutes");
const errorMiddleware=require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/user.routes");
const resumeRoutes=require("./routes/resumeRoutes");
const questionRoutes=require("./routes/questionRoutes");
const authroutes=require("./routes/authroutes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/questions",questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/api/auth",authroutes);

app.get("/",(req,res)=>{
    res.send("Welcome to AI Interview Platform API");
})

app.use("/api/auth",authrout);
app.use(errorMiddleware);

startServer();
const PORT = process.env.PORT || 5000;
async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
    console.log("Server running");
});}
