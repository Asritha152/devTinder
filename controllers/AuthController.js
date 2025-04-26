const  express = require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/Usermodel')
const generateToken=require('../utils/generateToken')
express().use(express.json())
const registerUser=async (req,res)=>{
    try{
    const {firstName,lastName,email,password,skills,profileURL,gender,bio}=req.body;
    if(!firstName.trim() || !email.trim() ||!password.trim()|| !gender ){
        return res.status(404).send("Enter all the required fields");
    
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("user thereu");
        return res.status(400).json({ message: 'User already exists' });
    }
    const passwordHash=await bcrypt.hash(password,10);
    const user=await new User({
        firstName,lastName,email,skills,profileURL:profileURL|| 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',gender,bio,
        password:passwordHash
    })
    await user.save();
    res.send("user registered successfully")}
    catch (error) {
        console.log(error.message);
        res.send("Some error occured")
        
        
    }

}
const loginUser=async (req,res) => {
    try{
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).send("Enter all the required fields")
            
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found please register to login ' });
        }
        const isMatched=await existingUser.matchPassword(password)
        if(!isMatched){
            return res.status(400).send("Invalid credentials");
        }
        res.cookie('token',generateToken(existingUser._id),{
            httpOnly: true,
            secure: true, 
        });
        res.send("user logged in successfully")
    }
    catch(error){
        console.log(error.message)
    }
   
    
    
}
module.exports={registerUser,loginUser}