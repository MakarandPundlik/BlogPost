const userSchema = require('../models/user');

module.exports.addBlog=(req,res)=>{
    const {title,data} = req.body.blog;
    const {email} = req.body;
    userSchema.findOne({email})
    .then((res)=>{
        console.log("User found")
        console.log(res)
        
    })
    .catch((err)=>{
        console.log("Something wend wrong")
    })
    
    console.log(title,data);
    return res.json({msg:"Blog added successfully"});
}