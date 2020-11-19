const express = require('express');
const {signup_post,login_post} = require('../controllers/authcontroller');
const Router = express.Router();

Router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
   res.header("Access-Control-Allow-Methods","GET,POST"); 
   
    next();
})

Router.get('/',(req,res)=>{
    res.cookie("data","this cookie is working",{
        httpOnly:true,
        maxAge:60*1000
    });
    res.send('<h1>Welcome</h1>')
});
Router.post("/api/signup",signup_post);
Router.post("/api/login",login_post);
module.exports = Router;