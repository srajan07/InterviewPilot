require("dotenv").config();
const express=require("express");
const cookieParser = require("cookie-parser");
const app=express();
const authrout=require("./routes/authrout");
const errorMiddleware=require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Welcome to AI Interview Platform API");
})

app.use("/api/auth",authrout);
app.use(errorMiddleware);

startServer();
async function startServer() {
    await connectDB();

    app.listen(5000, () => {
    console.log("Server running");
});}
