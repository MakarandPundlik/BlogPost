const express = require('express');
const {signup_post,login_post} = require('../controllers/authcontroller');
const logout_get = require('../middlewares/logout');
const isAuthenticated =require('../middlewares/auth');
const userSchema = require('../models/user');
const { addBlog,getBlogs,getMyblogs,deleteBlog,editBlog,incrementViews,addComment} = require('../middlewares/blogMiddleware');
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

//request to get users blogs
Router.post("/api/getmyblogs",getMyblogs);

//blog delete request
Router.post("/api/deleteblog",deleteBlog);
//addblog req handler
Router.post("/api/addblog",addBlog);


//register req hanlder
Router.post("/api/signup",signup_post);

//login req handler
Router.post("/api/login",login_post);

//edit blog request handler
Router.post("/api/editblog",editBlog);

//incement views 
Router.post("/api/incrementviews",incrementViews);

//add comments
Router.post("/api/addcomment",addComment);

module.exports = Router;