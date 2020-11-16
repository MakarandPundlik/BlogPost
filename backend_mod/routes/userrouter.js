const express = require('express');
const {signup_post,login_post} = require('../controllers/authcontroller');
const Router = express.Router();

Router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", 
    "Origin,X-Requested-With,Content-Tpe,Accept,Authorization");
    next();
});
Router.get('/',(req,res)=>res.send('<h1>Welcome</h1>'));
Router.post('/api/signup',(req,res)=>{
   
    console.log('post req was made');
     res.send(req.body)
});
Router.post('/api/login',(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
     res.send(email,password);
});
module.exports = Router;