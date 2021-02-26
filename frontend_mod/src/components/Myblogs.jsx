import React, { useEffect, useState } from 'react';
const API_URL = "http://localhost:2020"
function Myblogs(props) {
    const [blogs,setBlogs] = useState([]);

    const getmyBlogs=async()=>{
        
    }
    useEffect(()=>{
            getmyBlogs();
    })
    return (
       
        <div>
            
        </div>
    );
}

export default Myblogs;