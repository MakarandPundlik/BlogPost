const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getuserEmail=(accesstoken)=>{
    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRETE,(err,decoded)=>{
        return decoded.email;
    })
}

module.exports.addBlog = (req, res) => {
    const { title, data } = req.body.blog;
    

    //get the user's email from accesstoken provided
   
        
            
            const newblog = {
                title,
                data
            }
           const email=getuserEmail(req.body.accesstoken);
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
module.exports.getmyBlogs = (req, res) => {
    let blogArray;
    const email = getuserEmail(req.body.accesstoken);
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