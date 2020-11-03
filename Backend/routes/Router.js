const express = require('express');
const Router = express.Router();
const ProfileModel = require('../models/profilemodel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { RegisterValidator,LoginValidator } = require('../validator/ProfileValidator');
const secrete = require('../config/Keys').secrete;


//handling cors errors
Router.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Tpe,Accept,Authorization"
    );
   res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
       
    next();
})



//register request handler
Router.post('/register/profile',(req,res,next)=>{
    console.log('register req was made');

    //validating registration
    const {msg,isValid} = RegisterValidator(req.body);
    if(!isValid)
    {
        return res.status(401).json({msg:msg});
    }
    ProfileModel.findOne({email:req.body.email})
    .then((profile)=>{
        if(profile)
        {
           return  res.status(406).json({msg:'user already exist'});
        }
       
        const newProfile = new ProfileModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
            
        })

         //hash the passwords before saving to database
         bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newProfile.password,salt,(err,hash)=>{
                if(err)
                {
                    throw err;
                }
               newProfile.password = hash;
               newProfile.save()
               .then((user)=>{

                   //generatung a token
                    const token = jwt.sign({id:user._id},secrete,{
                    expiresIn:86400 //24 hrs in seconds
                });

               res.status(200).send({auth:true,token});
                })
               .catch(err => console.log(err));
            });
        });
    })
});



//login req handler
Router.post('/login/profile',(req,res,next)=>{
    console.log('login req was made');

    //validating email
    const {msg,isValid} = LoginValidator(req.body);

    if(!isValid)
    {
        return res.status(404).json({msg});
    }
    const email = req.body.email;
    const password = req.body.password;
    ProfileModel.findOne({email})
    .then((user)=>{
        if(!user)
        {
          return   res.status(404).json({msg:'user doe not exist'})
        }
        
        //compare passwords
        bcrypt.compare(password,user.password)
        .then((isMatch)=>{
            if(!isMatch)
            {
               return res.status(401).json({msg:'please enter the correct password'})
            }
            
                const token = jwt.sign({id:user._id},secrete,{
                expiresIn:86400 //24 hrs

            });
           return res.status(200).send({token});
        })
        .catch((err)=>console.log(err));
    })
    .catch((err)=>console.log(err));
    
});



//sending the token to client
Router.get('/verifytoken',(req,res)=>{
    const token = req.headers["token"];
    console.log('verification request was made');
    console.log(req.headers.token);
    if(!token) return res.status(401).send({msg:'no token'});
    
    jwt.verify(token,secrete,(err,decoded)=>{
        if(err) return res.status(500).send({msg:'failed to authenticate'});

       // res.status(200).send(decoded);

       ProfileModel.findById(decoded.id,{password:0})  //projection
       .then((user)=>{
           if(!user) return res.status(401).send({msg:'user not found'});
           
           return res.status(200).send({msg:'token verified',user});
       })
    });
})


module.exports = Router;