import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ImageArray from './ImagesData';
import fullblog from '../images/fullblog.jpg';
import axios from 'axios';
const API_URL = "http://localhost:2020";
function Fullblog(props) {

//to set likes and dislikes
let [likes,setLikes] = useState(25);
let [dislikes,setDislikes] = useState(15);

const [liked,isLiked] = useState(false);
const [disliked,isDisliked] = useState(false);

//handlelikes dislikes
const handleLikeDislikes=()=>{
  if(liked)
    setLikes(++likes);
  else if(disliked)
    setDislikes(++dislikes);
    else if(liked&&disliked){
      setLikes(--likes);
      setDislikes(--dislikes);
    }
}

//setting up location sent from previous call
const location = useLocation();

//redirect after blog has been deleted
const [redirect,setRedirect] = useState(false);

//setting state to read full blog
const [state, setState] = useState({
  title: location.state.title,
  data: location.state.data,
  author: location.state.author,
  isAuthenticated: location.state.isAuthenticated,
  id: location.state.id,
  date:location.state.date,
  views:location.state.views
})

useEffect(()=>{
  //console.log(state);
},[state]);



  

  //handle edits
  const handleEdit=()=>{
    console.log('please enter the edited blog');
  }
 
  //handle delete
  const handleDelete = async () => {
    await axios.post(`${API_URL}/api/deleteblog`, {
      accesstoken: localStorage.getItem("accesstoken"),
      _id: state.id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        console.log(res.data);
       
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      })

    console.log(state.id)
  }

  return (
    redirect ?
     <Redirect to="/dashboard"></Redirect>
      :
      <div style={{marginTop:"10%"}}><div className="card mx-auto m-5" style={{ maxWidth: '750px' }}>
      <img src={fullblog} className="card-img-top" alt="..." />
      <div className="card-body">
        {
          location.state.isAuthenticated &&
          <div className="text-right">
            <button className="btn custom-btn m-1" onClick={() => handleEdit()}>Edit</button>
            <button className="btn custom-btn" onClick={() => handleDelete()}>Delete</button>
          </div>
        }
        <h4 className="card-title">{state.title}</h4><hr />
        <h5 className="card-text">{state.data}</h5>

      </div>
      <div className="card-footer ">
        <h5 className="text-right">-{state.author}</h5>
        <div className="d-flex">
          <ion-icon name="eye-sharp" size="large"></ion-icon>
          <h5 className="m-1">{state.views}</h5></div>
        
        <div className="text-left">
         {state.date}
          </div>
      </div>
    </div>
    </div>
  );
}

export default Fullblog;