export const SignupValidator = (profile) => {
    if (!profile.email || !profile.password || !profile.firstname || !profile.lastname || !profile.conpassword || !profile.about || !profile.age || !profile.gender)
        return {
            title:'Errors',
            text: 'All fileds are mandatory',
            status: false,
            myclass:'alert alert-danger alert-dismissible fade show'
        }

    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(profile.email))
        return {
            title:'Email',
            text: 'Please enter valid email id',
            status: false,
            myclass:'alert alert-danger alert-dismissible fade show'
        }
    else if (profile.password.length < 6)
        return {
            title:'Password',
            text: 'Password must be longer than 6 characters',
            status: false,
            myclass:'alert alert-danger alert-dismissible fade show'
        }
    else if (profile.password != profile.conpassword)
        return {
            title:'Password',
            text: 'Please re enter your password',
            status: false,
            myclass:'alert alert-danger alert-dismissible fade show'
        }
        else
        return {
            title:'Hola',
            text: 'All fields seems to be okay',
            status: true,
            myclass:'alert alert-success alert-dismissible fade show'
        }
}

export const LoginValidator = (profile) =>{
    if(!profile.email||!profile.password)
    return {
        title:'Errors',
            text: 'All fileds are mandatory',
            status: false,
            myclass:'alert alert-danger alert-dismissible fade show'
    }
    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(profile.email))
        return {
            title:'Email',
            text: 'Please enter valid email id',
            status: false,
            myclass:'alert alert-danger alert-dismissible fade show'
        }
    else 
    return{
        title:'Hola',
        text: 'All fields seems to be okay',
        status: true,
        myclass:'alert alert-success alert-dismissible fade show'
    }
} 