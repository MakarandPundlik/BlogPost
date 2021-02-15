export const SignupValidator = (profile) => {
    if (!profile.email || !profile.password || !profile.firstname || !profile.lastname || !profile.congpassword)
        return {
            msg: 'All fileds are mandatory',
            status: false
        }

    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(profile.email))
        return {
            msg: 'Please enter valid email id',
            status: false
        }
    else if (profile.password.length < 6)
        return {

            msg: 'Password must be longer than 6 characters',
            status: false

        }
    else if (profile.password !== profile.congpassword)
        return {
            msg: 'Please re enter your password',
            status: false
        }
        else
        return {
            msg: 'All fields seems to be okay',
            status: true
        }
}

export const LoginValidator = (profile) =>{
    if(!profile.email||!profile.password)
    return {
        msg:'All fields are mandatory',
        status:false
    }
    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(profile.email))
        return {
            msg: 'Please enter valid email id',
            status: false
        }
} 