const express = require('express');
const {signup_post,login_post} = require('../controllers/authcontroller');
const logout_get = require('../middlewares/logout');
const isAuthenticated =require('../middlewares/auth');
const userSchema = require('../models/user');
const { addBlog,getBlogs } = require('../middlewares/blogMiddleware');
const Router = express.Router();

Router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version,Set-Cookie, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
   res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS"); 
   res.header("Content-Type","application/json");
   res.header("Access-Control-Allow-Credentials", true);
    next();
})

Router.get("/api/getblogs",getBlogs);
//blog req handler
Router.post("/api/addblog",addBlog);
//register req hanlder
Router.post("/api/signup",signup_post);

//login req handler
Router.post("/api/login",login_post);

//user auth req handler
Router.post("/api/authenticate",isAuthenticated);

//logout request
Router.get("/api/logout",logout_get,(req,res)=>{
    res.json({msg:"user logged out successfully"})
});
module.exports = Router;