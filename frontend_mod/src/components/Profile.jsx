import React, { useState } from 'react';
import ImageArray from './ImagesData';
import upload_image from '../images/upload_image.png'
function Profile(props) {
    const [state,setState] = useState({
        profilepic:null
    })
    const {profilepic} = state;
    return (
        <div className="card" style={{width:"20rem"}}>
        <div className="text-center m-3">
            {
                profilepic===null?
                <img src={upload_image} class="rounded-circle" height="200px" width="200px" alt="..."/>:
                <img src={ImageArray[0]} class="rounded-circle" height="200px" width="200px" alt="..."/>
            }
        </div>
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <p className="card-text">Somwthing about you</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Total Blogs Written : </li>
          <li className="list-group-item">Total Views : </li>
        </ul>
       
      </div>
    );
}

export default Profile;