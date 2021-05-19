import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Loading from "./Loading";
const API_URL = "http://localhost:2020"
function Report(props) {
  const [blogs,setBlogs] = useState([]);
    useEffect(async()=>{
      if(!localStorage.getItem("accesstoken"))
       props.history.push("/login");

        await axios.post(`${API_URL}/api/getreport`,{
            accesstoken:localStorage.getItem("accesstoken")
        },{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((res)=>{
         
          const blogArray = res.data.blogArray;
            //console.log(blogArray);
            setBlogs(blogArray)
           // console.log(blogs)
        })
        .catch((err)=>{
            console.log(err);
        })

    },[blogs])

    
  return (
    <div
    className="mx-4"
      style={{ marginTop: "10%",color:"#4bcbeb" }}
    >
     {
       blogs.length>0? <table className="table">
       <thead>
         <tr className="bg-light">
           <th scope="col">Sr No.</th>
           <th scope="col">Title</th>
           <th scope="col">Date</th>
           <th scope="col">Views</th>
         </tr>
       </thead>
       <tbody>
        {
         
          
          blogs.map((blog,index)=>{
           
            return(
             <tr className={index%2==0?"bg-info":"bg-light"} key={index+1}>
             <th scope="row">{index+1}</th>
             <td>{blog.title}</td>
             <td>{blog.date?blog.date:"-"}</td>
             <td>{blog.views}</td>
           </tr>
            )
          })
        }
        
       </tbody>
     </table>
    :<h3 className="text-center">You Haven't Written Any Blogs Yet</h3>
     }
    </div>
  );
}

export default Report;
