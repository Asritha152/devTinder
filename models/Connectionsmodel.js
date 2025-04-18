const  mongoose = require('mongoose');
const conncetionsSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:{
            values:['ignore','interested','accepted','rejected'],
            message:'{VALUE} is not a valid status'
            },
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('connectionRequests',conncetionsSchema);

