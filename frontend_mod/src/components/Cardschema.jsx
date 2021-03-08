import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Blogvalidator from '../services/Blogvalidator';
import Fullblog from './Fullblog';
import ImageArray from './ImagesData';
function Cardschema(props) {
  //to set likes and dislikes
  let [likes,setLikes] = useState(0);
  let [dislikes,setDislikes] = useState(0);

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
  const handleLike=(e)=>{
    e.preventDefault();
    setLikes(++likes);
    console.log(likes);
  }

  const handleDislike=(e)=>{
    e.preventDefault();
    setDislikes(++dislikes);
    console.log(dislikes);
  }

  const handleClick=(e)=>{
    e.preventDefault();
    history.push({
      pathname: '/fullblog',
     // search: '?query=abc',
      state
  });
  }

  return (
    
    <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6">
      <div className="card m-3 shadow-lg">
        <img src={ImageArray[Math.floor(Math.random()*ImageArray.length)]} className="card-img-top" alt="Blog image" />
        <div className="card-body">
          <h4 className="card-title text-bold ">{props.title}</h4>
          <button className="btn btn-dark m-1" onClick={(e)=>handleClick(e)}>Read Blog</button>
          <h5 className="text-right">-{props.author}</h5>
          <div className="text-left">
          {/* <ion-icon name="thumbs-up-outline" size="large" onClick={(e)=>handleLike(e)}></ion-icon>
          <ion-icon name="thumbs-down-outline"  size="large" onClick={(e)=>handleDislike(e)}></ion-icon> */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Cardschema;