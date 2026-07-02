require("dotenv").config();
const express=require("express");
const app=express();
const authrout=require("./routes/authrout");

const { connectDB } = require("./config/db");
app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Welcome to AI Interview Platform API");
})

app.use("/api/auth",authrout);
console.log("Hello world");
startServer();
async function startServer() {
    await connectDB();

    app.listen(5000, () => {
    console.log("Server running");
});}
