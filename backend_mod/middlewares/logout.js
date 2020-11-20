const logout_get =(req,res,next)=>{
    res.clearCookie("accesstoken");
    next();
} 
module.exports = logout_get;