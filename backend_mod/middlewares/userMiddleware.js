const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//get the user's email from accesstoken provided
const getuserEmail = (accesstoken) => {
    let email='';
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
       if(err)
       return err;
       email = decoded.email;
    })
    return email;
}

module.exports.editProfile=async(req,res)=>{
    const {firstname,lastname,password,email,age,gender} = req.body;
    // const useremail = getuserEmail(accesstoken);
    const useremail = email;
   await userSchema.findOneAndUpdate(
        {email:useremail},
        {$set:{"firstname":firstname,"lastname":lastname,"email":email,"password":password,"age":age,"gender":gender}},
        {useFindAndModify:false}
        )
        .then((result)=>{
            console.log(result);
            return res.json({msg:"Profile has been edited successfully..."});     
        })
        .catch((err)=>{
            console.log(err);
        });
}