const userSchema = require('../models/user');

module.exports.addBlog=(req,res)=>{
    const {title,data} = req.body.blog;
    console.log(title,data);
    const {email} = req.body;
    const newblog ={
        title,
        data
    }
    userSchema.findOneAndUpdate(
        {email},
        {$push:{blogArray:newblog}},
        {upsert:true,useFindAndModify:false}
        
        )
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
        userSchema.findOneAndUpdate({email})
        .then(res=>console.log(res))
        .catch((err)=>console.log(err));
    return res.json({msg:"Blog added successfully"});
}