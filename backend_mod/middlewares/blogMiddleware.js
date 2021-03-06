const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//get the user's email from accesstoken provided
const getuserEmail = (accesstoken) => {
    let email='';
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
       if(err)
       return err;
       email = decoded.email;
    })
    return email;
}

//get users blog
module.exports.getMyblogs=(req,res)=>{
    const email = getuserEmail(req.body.accesstoken);

    if(!email)
    return res.json({msg:"Invalid token"});

    userSchema.findOne({email})
    .then((user)=>{
       // console.log(user.blogArray);
        const blogArray = user.blogArray;
       return res.json({blogArray,isAuthenticated:true,username:user.firstname+" "+user.lastname});
    })
    .catch((err)=>{
        console.log(err);
    })
}

//add a user's blog
module.exports.addBlog = (req, res) => {
    const { title, data,author } = req.body.blog;
    
    const newblog = {
        title,
        data,
        author
    }
    const email = getuserEmail(req.body.accesstoken);

    if(!email)
    return res.json({msg:"Invalid token"});

    userSchema.findOneAndUpdate(
        { email },
        { $push: { blogArray: newblog } },
        { upsert: true, useFindAndModify: false }
    )
        .then(user => {

            return res.json({ msg: "blog added successfully", isAuthenticated: true });
        })
        .catch(err => {
            console.log(err);
        });
}

//get all blogs
module.exports.getBlogs=(req,res)=>{
    userSchema.find({blogArray:{$ne:null}},{_id:0,blogArray:1})
    .then((result)=>{
        return res.json({size:result.length,result});
    })
    .catch(err=>console.log(err));
}

//delete particular blog
module.exports.deleteBlog=(req,res)=>{
    const blogId = req.body.blogId;
    const email = getuserEmail(req.body.accesstoken);

    if(!email)
    return res.json({msg:"Invalid token"});

    userSchema.findOneAndDelete(
        {email},
        {$pull :{blogArray:{_id:blogId}}}
    )
    .then((user)=>{
        return res.json({user})
    })
    .catch((err)=>{
        console.log(err);
    })
}