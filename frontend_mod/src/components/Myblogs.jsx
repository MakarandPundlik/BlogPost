import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import Cardschema from './Cardschema';
const API_URL = "http://localhost:2020"
function Myblogs(props) {
    const [blogs,setBlogs] = useState([]);
    const [redirect,setRedirect] = useState(false);
    const getmyBlogs=async()=>{
        await axios.get(`${API_URL}/api/getmyblogs`,{accesstoken:localStorage.getItem("accesstoken")},
        {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
          .then((res)=>{
              console.log(res);
          })
          .catch((err)=>{
              console.log(err);
          })
    }
    useEffect(async()=>{
        await axios.get(`${API_URL}/api/authenticate`,{
            accesstoken:localStorage.getItem("accesstoken"),
        },
        {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
        .then((res)=>{
            if(!res.data.isAuthenticated)
                setRedirect(true);
        })
            getmyBlogs();
    })
    return (
       redirect?<Redirect to="/login"></Redirect>:
       <div>
            <h3 className="text-secondary m-5">Edit your blogs here</h3>
           <Cardschema/>
       </div>
    );
}

export default Myblogs;