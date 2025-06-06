const jwt = require('jsonwebtoken');
module.exports= function generateToken(userId) {
    const token=jwt.sign({userId},process.env.SECRET_KEY);
    return token; 
}