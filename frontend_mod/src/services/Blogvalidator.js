const Blogvalidator = (blog) =>{
    const {title,data} = blog;
    let msg='',status=false;
    if(!title || !data)
    {
        msg='All fields are mandatory';
        status=true;
    }
    return {
        msg,
        status
    }
}
export default Blogvalidator;