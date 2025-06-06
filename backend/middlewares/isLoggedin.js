const jwt=require('jsonwebtoken')
const isLoggedin=(req,res,next)=>{
    try{
        const tok=req?.cookies?.token;
        if(!tok){
            return res.status(400).send("Loggin to get profile")
        }
        req.userId=jwt.verify(tok,process.env.SECRET_KEY).userId;
        next()
    }
    catch(error){
        res.status(400).send(error.message)
    }
}
module.exports=isLoggedin