const isLoggedin = require('../middlewares/isLoggedin');
const Usermodel = require('../models/Usermodel');
const bcrypt=require('bcrypt')
const validator=require('validator')
const  router = require('express').Router();

router.get('/',isLoggedin,async (req,res)=>{
    try {
    const user=await Usermodel.findOne({_id:req.userId}).select('-password -email');
    res.json({user});
        
    } catch (error) {
        res.json({message:'error fetching profile '})
        
    }
    
})

router.put('/edit',isLoggedin,async (req,res)=>{
    try {
        const userId=req.userId;
        console.log(req.body);
        
    const {firstName,lastName,skills,profileURL,gender,bio}=req.body;
    if (!firstName || !gender) {
        return res.status(400).send('Enter all the required fields')
        
    }
    const updatedUser=await Usermodel.findByIdAndUpdate(userId,{
    firstName,lastName,skills,profileURL,gender,bio },{new:true})
       res.json({updatedUser}) 
    } catch (error) {
        res.json({message:'Error updating the user information'})  
    }
})

router.patch('/forgotpassword',isLoggedin,async (req,res)=>{
    try {
        const {userId}=req;
        console.log(userId)
        const {newpassword}=req.body;
        if (!validator.isStrongPassword(newpassword)) {
           return res.status(500).send('choose a strong password')    
        }
        console.log(newpassword)
        const passwordHash=await bcrypt.hash(newpassword,10);
        console.log(passwordHash)
        await Usermodel.findByIdAndUpdate(userId,{
            password:passwordHash
        })
        res.send('Password changed successfully......')
    } catch (error) {
        res.send('Error updating the password')  
    }

})
module.exports=router;