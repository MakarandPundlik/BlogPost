const express = require('express');

const Router = express.Router();

Router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", 
    "Origin,X-Requested-With,Content-Tpe,Accept,Authorization");
});
