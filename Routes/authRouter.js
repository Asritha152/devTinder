const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/AuthController');
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",(req,res)=>{
    res.cookie('token','')
    res.send("user logged out")
})
module.exports=router;