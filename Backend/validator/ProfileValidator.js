 const RegisterValidator = (profile) =>{
    const {firstname,lastname,email,password,con_password} = profile;
    if(!firstname || !lastname || !email || !password || !con_password)
    {
        return {
            msg:'all fields are mandatory',
            isValid:false
        }
    }
    
     if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    {
        return{
            msg:'please enter correct email',
            isValid:false
        }
    }
    if(password!==con_password)
    {
        return{
            msg:'invalid passwords please try again',
            isValid:false
        }
    }
     if(password.length <= 5)
    {
        return{
            msg:'password should be at least 6 characters long',
            isValid:false
        }
    }
    else 
    {
        return{
            msg:'registration is valid',
            isValid:true
        }
    }
}
const LoginValidator = (profile) =>{
    const {email,password} = profile;
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    {
        return{
            msg:'invalid email',
            isValid:false
            }
    }
    else{
        return{
            msg:'login is valid',
            isValid:true
            }
    }
}

module.exports={
    RegisterValidator,
    LoginValidator
}