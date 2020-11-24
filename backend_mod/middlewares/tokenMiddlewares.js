const jwt = require('jsonwebtoken');
require('dotenv').config();

   

const createAccessToken = (user) =>{
    //create payload
    const payload = {
        username:user.firstname,
        email:user.email
    }
    //create token
    const AccessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRETE,{
        algorithm:"HS256",
        expiresIn:10000
    });
    return AccessToken;
}
module.exports = createAccessToken;