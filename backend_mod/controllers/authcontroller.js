const userSchema = require('../models/user');
const bcrypt = require('bcrypt');


//signup handler
module.exports.signup_post =(req,res)=>{
    const {firstname,lastname,email,password} = req.body;
    console.log(email);
    //common error object
    let errors = {email:'',password:''};
    //check for the existing user
    userSchema.findOne({email})
    .then((user)=>{
        if(user)
        {
            
           errors.email = "User already exists";
           res.statusCode = 406;
           res.json(errors);
       }
        
        else
       {
        const newUser = new userSchema({
            firstname,
            lastname,
            email,
            password
        });

         //hash passwords before saving to the database
         bcrypt.genSalt(10,(err,salt)=>{
            if(err)
            {
                errors.password = "Something went wrong while hashing";
                res.statusCode = 500;
                res.json(errors);
            } 
            else
            {
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err)
                    {
                         errors.password = "Something went wrong while hashing";
                         res.statusCode = 500;
                         res.json(errors);
                    }
                    else{
                        newUser.password = hash;
                        newUser.save();
                        res.cookie("isAuthenticated",true);
                         res.status(200).json({newUser});
                    }
                })
            }
         })

        
        }
})
 .catch((err)=>console.log(err));
   
}

//login handler
module.exports.login_post = (req,res)=>{
    const {email,password} = req.body;
    let errors = {email:'',password:''};

    //check for the existing email
    userSchema.findOne({email})
    .then((user)=>{
        if(!user)
        {
            errors.email="User does not exists";
            res.statusCode = 403;
            res.json(errors);
        }
        else
        {
            //check the hasged passwords
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err || !isMatch)
                {
                    errors.password = "Please Enter the valid password";
                    res.statusCode = 401;
                    res.json(errors);
                }
                else
                {
                    res.cookie("isAuthenticated",true);
                    res.status(201).json(user);
                }
            })
        }
    })
    .catch((err)=>console.log(err));
   
}