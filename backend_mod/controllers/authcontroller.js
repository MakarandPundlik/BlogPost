const userSchema = require('../models/user');


module.exports.signup_post =(req,res)=>{
    const {firstname,lastname,email,password} = req.body;
    console.log(email);
    let errors = {email:'',password:''};
    //check for the existing user
    userSchema.findOne({email:email})
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
        newUser.save()
        res.status(200).json({newUser});
        }
})
 .catch((err)=>console.log(err));
   
}

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
            if(user.password !== password)
            {
                res.statusCode = 403;
                errors.password = "Incorrect password";
                res.json(errors);
            }
            else
            {
                res.status(201).json({user});
            }
        }
    })
    .catch((err)=>console.log(err));
   
}