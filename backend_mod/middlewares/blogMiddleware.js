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
        .then(res=>{
           console.log(res.blogArray);
        })
        .catch(err=>{
            console.log(err);
        });

       
        return res.json({msg:"blog added successfully",status:true});
    
}
module.exports.getBlogs=(req,res)=>{
    userSchema.find({})
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })

    return res.json({msg:"All blogs are sent"});
}