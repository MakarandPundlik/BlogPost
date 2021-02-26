const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req,res)=>{
   
   const accesstoken = req.cookies.accesstoken;
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
        {
            res.cookie("isAuthenticated",true,{httpOnly:true,maxAge:3600000});
            return res.json({msg:"user has been authenticated"})
        }
        
    });
   }

}
module.exports = isAuthenticated;