const router = require('express').Router();
const isLoggedin = require('../middlewares/isLoggedin');
const connectionRequests = require('../models/Connectionsmodel');
const Usermodel = require('../models/Usermodel');

// Send Connection Request
router.post('/send/:status/:toUserId', isLoggedin, async (req, res) => {
    try {
        console.log("request hit");
        
        const { toUserId, status } = req.params;
        if (!['interested', 'ignored'].includes(status)) {
            return res.send('Invalid status type');
        }

        const userExists = await Usermodel.findById(toUserId);
        if (!userExists) {
            return res.send('Setting a request to a non-existing user');
        }

        const fromUserId = req.userId;
        const existingConnection = await connectionRequests.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnection) {
            return res.status(400).json({ message: "Connection already exists." });
        }

        const conn = new connectionRequests({ fromUserId, toUserId, status });
        await conn.save();
        const fromUser=await Usermodel.findOne({_id:fromUserId})
        const toUser=await Usermodel.findOne({_id:toUserId})
        console.log("succesfull");
        
        return res.status(201).json({type:'success',message:'Connection request sent successfully'  });

    } catch (err) {
        console.error(err);
        res.status(500).send({type:'error', message: "Something went wrong." });
    }
});

// Review Connection Request
router.post('/review/:status/:requestId', isLoggedin, async (req, res) => {
    try {
        console.log("review request hit");
        
        const { requestId, status } = req.params;
        if (!['accepted', 'rejected'].includes(status)) {
            return res.send('Invalid status type');
        }
        const toUserId = req.userId;
        const existingConnection = await connectionRequests.findOne({ _id:requestId,toUserId,status:'interested' });

        if (!existingConnection) {
            return res.status(404).send({ message: "Connection request not found." });
        }
        await connectionRequests.findByIdAndUpdate(existingConnection._id, { status });
        const fromUser=await Usermodel.findOne({_id:existingConnection.fromUserId})
        const toUser=await Usermodel.findOne({_id:toUserId})
        console.log("sent aa");
        
        return res.status(201).json({type:'success', message: 'connection is successfull' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({type:'error', message: "Something went wrong." });
    }
});

module.exports = router;
