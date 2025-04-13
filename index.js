const express = require('express');
const app=express();
app.get("/",(req,res,)=>{
    res.send("Hello server is working")
})
app.listen(3000,(err)=>{
    if(err){
        console.log("error connecting to port");
        return;
        
    }
    console.log("server listeneing on port 3000")
})