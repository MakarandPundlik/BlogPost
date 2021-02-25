const Blogvalidator = (blog) =>{
    const {title,data} = blog;
    let msg='',myclass="";
    if(!title || !data)
    {
        msg='All fields are mandatory';
       
        myclass='alert alert-danger fade show';
    }
    else {
        msg='Hola! all fields seems to be okay.'
        myclass='alert alert-success fade show';
    }
    return {
        msg,
        
        myclass
    }
}
export default Blogvalidator;