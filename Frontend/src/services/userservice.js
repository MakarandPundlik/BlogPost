import React,{useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
const API_URL = "http://localhost:2000/";

export const handleLogin = (profile,props) =>{
    axios.post(`${API_URL}login/profile`,JSON.stringify(profile),{
        headers:{
            Accept:"application/json",
                "Content-Type":"application/json"
        }
        
    })
    .then((res)=>{
        //console.log(res);
        if(! res.data.token)
        {
            alert(res.data.msg)
        }
        else
        {
            localStorage.setItem('token',res.data.token);
            props.history.push('/dashboard');
        }
    })
    .catch(err=>console.log(err));
}

export const handleSignup = (profile,props) =>{
    axios.post(`${API_URL}register/profile`,JSON.stringify(profile),{
        headers:{
            
                Accept:"application/json",
                "Content-Type":"application/json"
            
        }
    })
    .then((res)=>{
        //console.log(res)
        if(!res.data.token)
        {
            alert( res.data.msg);
        }
        else{
            localStorage.setItem('token',res.data.token);
            
            props.history.push('/dashboard');
        }
    })
    .catch((err)=>console.log(err));
}

export const handleAuth = () =>{
    
		let isAuthenticeted = false;
        axios.get(`${API_URL}verifytoken`,{
           headers:{
               Accept:"application/json",
               "Content-Type":"application/json",
               "token":localStorage.getItem('token')
           }
       })
       .then((res)=>{
           if(!res.data.user)
           {
               alert(res.data.msg);
               isAuthenticeted=false;
           }
           else
           {
               isAuthenticeted=true;
           }
       })
       .catch(err=>console.log(err));
   return isAuthenticeted;
}