const express = require('express');
const app=express();
require('dotenv').config()
const db=require('./config/mongodb-connection');
const cors=require('cors')
app.use(cors({
    origin:process.env.REACT_URL ,
    credentials: true              
  }));
const cookieParser=require('cookie-parser');

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
const profileRouter=require('./Routes/profileRouter')
const authRouter=require('./Routes/authRouter')
const requestRouter=require('./Routes/requests');
const userRouter=require('./Routes/userRouter')
app.get("/",(req,res,)=>{
    res.send("Hello server is working")
})
app.use('/auth',authRouter);
app.use('/profile',profileRouter);
app.use('/request',requestRouter)
app.use('/user',userRouter);

app.listen(3000,(err)=>{
    if(err){
        console.log("error connecting to port");
        return;  
    }
    console.log("server listeneing on port 3000")
})