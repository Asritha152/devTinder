const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(`${process.env.MONGO_URI}devTinder`).then(()=>{
    
    
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err.message);
    
    console.log("error connecting mongodb")
})
module.exports=mongoose.connection;