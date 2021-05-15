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
    return res.json({msg:"Invalid token",isAuthenticated:false});

    userSchema.findOne({email})
    .then((user)=>{
       // console.log(user.blogArray);
        const blogArray = user.blogArray;
        const today = new Date();
       return res.json({blogArray,isAuthenticated:true,username:user.firstname+" "+user.lastname,about:user.about,age:user.age,gender:user.gender,last_activity:user.last_activity});
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
        author,
        date:new Date().toString()
    }
    const email = getuserEmail(req.body.accesstoken);

    if(!email)
    return res.json({msg:"Invalid token",isAuthenticated:false});

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
    const blogId = req.body._id;
    //console.log(req.body);
    const email = getuserEmail(req.body.accesstoken);

    if(!email)
    return res.json({msg:"Invalid token",isAuthenticated:false});

    userSchema.findOneAndUpdate(
        {email},
        {$pull :{blogArray:{_id:blogId}}},
        { upsert: true, useFindAndModify: false,multi:true }
    )
    .then((user)=>{
        return res.json({msg:'Your blog has been deleted successfully',isDeleted:true})
    })
    .catch((err)=>{
        console.log(err);
    })
}

//modify blog - delete existing blog + insert same blog with changes
module.exports.editBlog=(req,res)=>{
    const email = getuserEmail(req.body.accesstoken);

    if(!email)
    return res.json({msg:"Invalid token",isAuthenticated:false});
    const {id,title,data}  = req.body;
    userSchema.findOneAndUpdate(
        {email,"blogArray._id":id},
        {$set:{"blogArray.$.title":title,"blogArray.$.data":data}},
        {useFindAndModify:false}
    )
    .then((result)=>{
        return res.json({msg:"Blog has been edited successfully",isEdited:true})
    })
    .catch((err)=>{
        console.log(err);
    })
}

//write a function to increase views of blogs by fetching blog using blog id
module.exports.incrementViews=async(req,res)=>{
    let {id,views} = req.body;
    views = parseInt(views)+1;
   await userSchema.findOneAndUpdate(
        {blogArray:{$elemMatch:{_id:id}}},
        {$set:{"blogArray.$.views":views}},
        {useFindAndModify:false}
    )
    .then((result)=>{
        console.log("Increment request routed...")
        return res.json({msg:"Views has been successfully updated",result})
    })
    .catch((err)=>{
        console.log(err);
    })
}
// db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})

//add comment to the blog
module.exports.addComment=async(req,res)=>{
    const{id,data,name} = req.body;
   await userSchema.findOneAndUpdate(
        {"blogArray._id":id},//find the blog first
        {
            $push:{
                "blogArray.$.comments":{
                    name,
                    data
                }
            }
        }
    ).then((result)=>{
        //console.log(result);
        return res.json({msg:"comment has been added successfully..."});
    })
    .catch((err)=>{
         console.log(err);
    })
}