import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tablerow from './Tablerow';
import Cardschema from './Cardschema';
const API_URL = "http://localhost:2020"
function Homepage(props) {
  const [loading,setLoading] = useState(true);
  const [blogs,setBlogs] = useState([]);
  
  useEffect(async() => {
    await axios.get(`${API_URL}/api/getblogs`,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    })
    .then((res)=>{
      console.log(res.data.result);
      setBlogs(res.data.result);
    })
    .catch((err)=>{
      console.log(err)
     
    })
  }, []);

  useEffect(()=>{
 // console.log(blogs)
  },[blogs]);
  return (
    
    <div>
      <h3 className="text-secondary m-5">Here are some blogs from BlogPost...</h3>
      <div className="row">
      {
        blogs.blogArray &&
        blogs.blogArray.map((blog)=>{
          return (
            
            <Cardschema/>
            
          )
        })
      }
      </div>
    </div>



  );

}

export default Homepage;