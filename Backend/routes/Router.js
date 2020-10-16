const express = require('express');
const Router = express.Router();
const ProfileModel = require('../models/profilemodel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secrete = require('../config/Keys').secrete;


//handling cors errors
Router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Tpe,Accept,Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,POST');
        return res.status(200).json({mesg:"preflight request was made"});
    }
    next();
})


//get request handler
Router.get('/profiles',(req,res,next)=>{
    console.log('get req was made')
    ProfileModel.find({})
    .then((profiles)=>{
       return res.send(profiles)
    })
    .catch(next);
});

//register request handler
Router.post('/register/profile',(req,res,next)=>{
    console.log('register req was made');
    
    ProfileModel.findOne({email:req.body.email})
    .then((profile)=>{
        if(profile)
        {
           return  res.status(400).json({msg:'user already exist'});
        }
       
        const newProfile = new ProfileModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            
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


//sending the token to client
Router.get('/verifytoken',(req,res)=>{
    const token = req.headers['token'];
    //console.log(req.headers);
    if(!token) return res.status(402).send({auth:false,token:'no token'});
    
    jwt.verify(token,secrete,(err,decoded)=>{
        if(err) return res.status(500).send({auth:false,token:'failed to authenticate'});

       // res.status(200).send(decoded);

       ProfileModel.findById(decoded.id,{password:0})  //projection
       .then((user)=>{
           if(!user) return res.status(400).send("'no user found");
           
           return res.status(201).send(user);
       })
    });
})
//login req handler
Router.post('/login/profile',(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    ProfileModel.findOne({email})
    .then((user)=>{
        if(!user)
        {
          return   res.status(400).json({emailnotfound:'user doe not exist'})
        }
        
        //compare passwords
        bcrypt.compare(password,user.password)
        .then((isMatch)=>{
            if(!isMatch)
            {
               return res.status(400).json({incorrectpassword:'please enter the correct password'})
            }
            
            const token = jwt.sign({id:user._id},secrete,{
                expiresIn:86400 //24 hrs

            });
            res.send({auth:true,token});
        })
        .catch((err)=>console.log(err));
    })
    .catch((err)=>console.log(err));
});

//logout request handler
Router.get('/profile/logout',(req,res)=>{
    res.send().json({isLoggedOut : true});
})
module.exports = Router;