const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req,res,next)=>{
    const accesstoken = req.headers["x-access-token"];

    if(!accesstoken)
   {
    res.statusCode = 401;
    res.json({msg:"No token provided"});
   }
   else
   {
    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRETE,(err,decoded)=>{
        if(err)
        {
            res.statusCode = 401;
            res.json({msg:"Invalid token"});
        }
        else
         next();
        
    });
   }

}
module.exports = isAuthenticated;