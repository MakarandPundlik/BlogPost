const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//get the user's email from accesstoken provided
const getuserEmail = (accesstoken) => {
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {

    })
}
module.exports.getMyblogs=(req,res)=>{
    const email = getuserEmail(req.body.accesstoken);
    userSchema.findOne({email})
    .then((user)=>{
        console.log(user.blogArray);
        const blogArray = user.blogArray;
        res.json({blogArray});
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports.addBlog = (req, res) => {
    const { title, data,author } = req.body.blog;
    
    const newblog = {
        title,
        data,
        author
    }
    const email = getuserEmail(req.body.accesstoken);
    userSchema.findOneAndUpdate(
        { email },
        { $push: { blogArray: newblog } },
        { upsert: true, useFindAndModify: false }
    )
        .then(user => {

            return res.json({ msg: "blog added successfully", status: true });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getBlogs=(req,res)=>{
    userSchema.find({blogArray:{$ne:null}},{_id:0,blogArray:1})
    .then((result)=>{
        return res.json({size:result.length,result});
    })
    .catch(err=>console.log(err));
}

