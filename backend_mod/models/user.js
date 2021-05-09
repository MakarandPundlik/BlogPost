const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        lowercase:true
    },
    lastname:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    age:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        required:true
    },
    last_activity:{
        type:String,
        required:true
    },
   blogArray:[
       {
        title:{
            type:String,
             required:true
        },
        data:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        views:{
            type:Number
        }
    }
   ]
});

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;