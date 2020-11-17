const userSchema = require('../models/user');


module.exports.signup_post =(req,res)=>{
    const {firstname,lastname,email,password} = req.body;
   console.log(firstname,lastname,email,password);
    res.status(200).json({firstname,lastname,email,password});
   
}

module.exports.login_post = (req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    res.status(200).json({email,password});
}