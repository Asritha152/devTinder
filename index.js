const express = require('express');
const app=express();
const db=require('./config/mongodb-connection');
const cookieParser=require('cookie-parser');
const { registerUser, loginUser } = require('./controllers/AuthController');
const User=require("./models/Usermodel")
const isLoggedin=require("./middlewares/isLoggedin")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res,)=>{
    res.send("Hello server is working")
})
app.post("/register",registerUser)
app.post("/login",loginUser)
app.get("/logout",(req,res)=>{
    res.cookie('token','')
    res.send("user logged out")
})
app.get("/profile",isLoggedin,async (req,res)=>{
    const user=await User.find({_id:req.userId});
    res.status(201).json(user)
})
app.listen(3000,(err)=>{
    if(err){
        console.log("error connecting to port");
        return;  
    }
    console.log("server listeneing on port 3000")
})