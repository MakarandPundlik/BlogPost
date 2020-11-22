import axios from 'axios';
import Cookies from 'universal-cookie';
const API_URL = "http:localhost:2020/api/authenticate";

const cookies = new Cookies();
 const  authService=()=>{
    let auth ={
        isAuth:false,
        msg:"token not provided"
    };
    if(!cookies.get("accesstoken"))
    return auth;
    axios.get(API_URL,{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            "x-access-token":cookies.get("accesstoken")
        }
    })
    .then(res=>{
        auth.isAuth=true;
        auth.msg="User authenticated";
    })
    .catch(err=>{
        console.log(err);
        auth.msg="Something went wrong";
    });
    return auth;
}
export default authService;