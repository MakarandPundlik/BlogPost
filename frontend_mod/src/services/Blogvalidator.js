const Blogvalidator = (blog) =>{
    const {title,data} = blog;
    let msg='',myclass="",flag=false;
    if(!title || !data)
    {
        msg='All fields are mandatory';
        flag=false;
        myclass='alert alert-danger fade show';
    }
    else {
        msg='Hola! Your blog has been added successfully.'
        myclass='alert alert-success fade show';
        flag=true;
    }
    return {
        msg,
        flag,
        myclass
    }
}
export default Blogvalidator;