const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
,"Invalid email"]

    },
    password:{
        type:String,
        validate:{validator:(v)=>{
          return validator.isStrongPassword(v)
        },message:"choose a strong password"}
    },
    gender:{
        type:String,
        enum:{
            values:['male','female','other'],
            message:'{VALUE} is not supported'
        }
    },
    skills:[{type:String}],
    profileURL:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }

},{timestamps:true})
module.exports=mongoose.model('User',userSchema);