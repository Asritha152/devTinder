const router = require('express').Router();
const isLoggedin = require('../middlewares/isLoggedin');
const connectionRequests = require('../models/Connectionsmodel');
const Usermodel = require('../models/Usermodel');

// Send Connection Request
router.post('/send/:status/:toUserId', isLoggedin, async (req, res) => {
    try {
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
            return res.status(400).send({ message: "Connection already exists." });
        }

        const conn = new connectionRequests({ fromUserId, toUserId, status });
        await conn.save();
        const fromUser=await Usermodel.findOne({_id:fromUserId})
        const toUser=await Usermodel.findOne({_id:toUserId})
        return res.status(201).send({ message: `${fromUser.firstName}  ${status}  ${toUser.firstName}`  });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Something went wrong." });
    }
});

// Review Connection Request
router.post('/review/:status/:requestId', isLoggedin, async (req, res) => {
    try {
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
        return res.status(201).send({ message: `${toUser.firstName}  ${status}  ${fromUser.firstName}` ,connection:{existingConnection} });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Something went wrong." });
    }
});

module.exports = router;
