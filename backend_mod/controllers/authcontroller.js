module.exports.signup_post =()=>{
    const {firstname,lastname,email,password} = req.body;
   console.log(firstname,lastname,email,password);
    res.send(firstname,lastname,email,password);
}

module.exports.login_post = async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    res.send(email,password);
}