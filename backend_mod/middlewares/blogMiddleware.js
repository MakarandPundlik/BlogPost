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
module.exports.getmyBlogs=(req,res)=>{
    let blogArray;
    const email = req.body.email;
    userSchema.findOne({email})
    .then((user)=>{
       if(!user.blogArray)
       {
           return res.json({msg:"No blogs found"});
       }
       else 
       {
           const blogArray = user.blogArray;
           return res.json({msg:"Blogs found",blogArray});
       }
    })
    .catch((err)=>{
        console.log(err);
    })

   
}