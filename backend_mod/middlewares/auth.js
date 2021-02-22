const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req,res,next)=>{
    const accesstoken = req.body.accesstoken;
    console.log(req.body);
    if(!accesstoken)
   {
    
    res.json({msg:"No token provided"});
   }
   else
   {
    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRETE,(err,decoded)=>{
        if(err)
        {
            
            res.json({msg:"Invalid token"});
        }
        else
         next();
        
    });
   }

}
module.exports = isAuthenticated;