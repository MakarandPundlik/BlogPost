import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tablerow from './Tablerow';
import Cardschema from './Cardschema';
const API_URL = "http://localhost:2020/"
function Homepage(props) {
  const [loading,setLoading] = useState(true);
  const [blogs,setBlogs] = useState([]);
  
  useEffect(async() => {
    
  }, []);

  useEffect(()=>{
   console.log(blogs)
  },[]);
  return (
    
    <div>
      <h3 className="text-secondary m-5">Here are some blogs from BlogPost...</h3>
      <div className="row">
      <Cardschema/>
      </div>
    </div>



  );

}

export default Homepage;