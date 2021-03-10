import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ImageArray from './ImagesData';
import fullblog from '../images/fullblog.jpg';
import axios from 'axios';
const API_URL = "http://localhost:2020";
function Fullblog(props) {



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
    id: location.state.id
  })

  
 
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
      <div className="card mx-auto my-5" style={{ maxWidth: '1000px' }}>
        <img src={fullblog} className="card-img-top" alt="..." />
        <div className="card-body">
          {
            location.state.isAuthenticated &&
            <div className="text-right">
              
              <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
            </div>
          }
          <h4 className="card-title">{state.title}</h4><hr />
          <h5 className="card-text">{state.data}</h5>

        </div>
        <div className="card-footer">
          <h5 className='text-right'>-{state.author}</h5>
          {/* <h5 className="text-left">Comments - <hr/>
        Add a comment <input type="text" id="newcomment" placeholder="Comment here..."></input>
       </h5>
       <hr/>
       <ul className="list-group list-group-flush">
        <li className="list-group-item text-left">An item <p className="text-right">-username</p></li>
      </ul> */}
        </div>
      </div>
  );
}

export default Fullblog;