const express = require('express');
const {signup_post,login_post} = require('../controllers/authcontroller');
const logout_get = require('../middlewares/logout');
const isAuthenticated =require('../middlewares/auth');
const userSchema = require('../models/user');
const Router = express.Router();

Router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
   res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS"); 
   res.header("Content-Type","application/json;charset=UTF-8");
    next();
})

Router.get("/",(req,res)=>{
  userSchema.find()
   .then((users)=>{
       if(users)
       {users.forEach(user=>{user.password=""});
       res.status(200).json({users});}
   })
   .catch((err)=>{
       console.log(err);
   })
});
//register req hanlder
Router.post("/api/signup",signup_post);

//login req handler
Router.post("/api/login",login_post);

//user auth req handler
Router.get("/api/authenticate",isAuthenticated,(req,res)=>{
    res.json({msg:"user has been authenticated"});
});

//logout request
Router.get("/api/logout",logout_get,(req,res)=>{
    res.json({msg:"user logged out successfully"})
});
module.exports = Router;