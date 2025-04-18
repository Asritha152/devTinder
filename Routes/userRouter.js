const router = require('express').Router();
const isLoggedin = require('../middlewares/isLoggedin');
const Connectionsmodel=require('../models/Connectionsmodel')
const Usermodel=require('../models/Usermodel')
router.get('/connections',isLoggedin,async (req,res)=>{
    try {
        const {userId}=req;
        let conn=await Connectionsmodel.find({$or:[{
            fromUserId:userId,status:'accepted'
        },{
            toUserId:userId,
            status:'accepted'
        }]}).populate('fromUserId',['firstName','bio','gender','skills'])
        .populate('toUserId',['firstName','bio','gender','skills']);
        console.log(conn)
        conn=conn.map(row=>{
            return row.fromUserId._id.equals(userId)?row.toUserId:row.fromUserId});
        console.log(conn)
        res.json({connections:conn})
        
    } catch (error) {
        res.status(400).send('Error fetching connections')
        
    }


})
router.get('/requestsreceived',isLoggedin,async (req,res)=>{
    try{
    const toUserId=req.userId;
    let reqrec=await Connectionsmodel.find({toUserId,status:'interested'}).populate('fromUserId',['firstName','bio','gender','skills']);
    reqrec=reqrec.map(row=>row.fromUserId)
    res.json({requestsReceived:reqrec});
    }
    catch(error){
        console.log(error.message);
        
        res.status(400).send('Error occured')
    }
})
router.get('/feed',isLoggedin,async (req,res)=>{
    try {
        const {userId}=req;
        let notinfeed=await Connectionsmodel.find({$or:[{
            fromUserId:userId,
        },{
            toUserId:userId,
        }]});
        notinfeed=[...notinfeed.map(row=>{
            return row.fromUserId.equals(userId)?row.toUserId:row.fromUserId
        }),userId]
        const feed=await Usermodel.find({_id:{$nin:notinfeed}},{email:0,password:0,createdAt:0,updatedAt:0,__v:0})
        res.send(feed)
        
    } catch (error) {
        res.send(error.message);
        
    }
})
module.exports=router