import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Blogvalidator from '../services/Blogvalidator';
import Fullblog from './Fullblog';
import ImageArray from './ImagesData';
function Cardschema(props) {
  
  let history = useHistory();
  //to send state to fullblog component
  const [state,setState] = useState({
    title:props.title,
    data:props.data,
    author:props.author,
    isAuthenticated:props.isAuthenticated,
    id:props.id
  })

 
  //handle Like and dislike function
  

  const handleClick=(e)=>{
    e.preventDefault();
    history.push({
      pathname: '/fullblog',
     // search: '?query=abc',
      state
  });
  }

  return (
    
    <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 ">
      <div className="card m-2 shadow-lg">
        <img src={ImageArray[Math.floor(Math.random()*ImageArray.length)]} className="card-img-top" alt="Blog image" />
        <div className="card-body">
          <h4 className="card-title ">{props.title}</h4>
         
          
          <div className="text-left">
         <div className="text-secondary">100{" "}{" "}100</div>
         
          </div>
          <button className="btn btn-dark m-1" onClick={(e)=>handleClick(e)}>Read Blog</button>
        </div>
      </div>
    </div>

  );
}

export default Cardschema;