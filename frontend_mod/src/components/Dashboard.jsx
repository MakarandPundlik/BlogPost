import axios from 'axios';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
const API_URL = 'http://localhost:2020';
function Dashboard(props) {
    useEffect(()=>{
        if(!localStorage.getItem("accesstoken"))
           props.history.push('/login');
            const accesstoken =  localStorage.getItem("accesstoken");
          axios.get(`${API_URL}/api/authenticate`,{
             accesstoken
          },
          {
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Access-Control-Allow-Origin': '*'
            }  
          }) 
          .then((res)=>console.log(res))
          .catch((err)=>console.log(err));
    },[])
    return (
        <div>
             <h1>Welcome to dashboard</h1>
        </div>
    );
}

export default Dashboard;