const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.addBlog = (req, res) => {
    const { title, data } = req.body.blog;
    const  accesstoken  = req.body.accesstoken;

    //get the user's email from accesstoken provided
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
        
        
            console.log(title, data);
            const newblog = {
                title,
                data
            }
           const email=decoded.email;
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


        
    })
 

}
module.exports.getmyBlogs = (req, res) => {
    let blogArray;
    const email = req.body.email;
    userSchema.findOne({ email })
        .then((user) => {
            if (!user.blogArray) {
                return res.json({ msg: "No blogs found" });
            }
            else {
                const blogArray = user.blogArray;
                return res.json({ msg: "Blogs found", blogArray });
            }
        })
        .catch((err) => {
            console.log(err);
        })


}