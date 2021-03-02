const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//get the user's email from accesstoken provided
const getuserEmail = (accesstoken) => {
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {

    })
}

module.exports.addBlog = (req, res) => {
    const { title, data } = req.body.blog;
    
    const newblog = {
        title,
        data
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
    userSchema.find({blogArray:{$ne:null}},{_id:0,blogArray:1,firstname:1,lastname:1})
    .then((result)=>{
        return res.json({size:result.length,result});
    })
    .catch(err=>console.log(err));
}

