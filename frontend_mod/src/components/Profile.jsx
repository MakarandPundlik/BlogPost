import React, { useEffect, useState } from 'react';
import ImageArray from './ImagesData';
import upload_image from '../images/upload_image.png'
function Profile({
  total,name
}) {
    const [state,setState] = useState({
        profilepic:null
    })
    
   
    const handleFileChange=(e)=>{
      setState({...state,profilepic:e.target.files[0]})
      console.log(state.profilepic);
    }
    return (
        <div className="row">
          <div className="card m-3" style={{width:"20rem"}}>
        <div className="text-center m-3">
            {
                state.profilepic===null?
                <div><img src={upload_image} className="rounded-circle" height="200px" width="200px" alt="..."/><input type="file"/><button onClick={handleFileChange}>Upload</button></div>:
                <img src={state.profilepic} className="rounded-circle" height="200px" width="200px" alt="..."/>
            }
           
        </div>
        <div className="card-body">
          <h5 className="card-title">{name.toLocaleUpperCase()}</h5>
          
        </div>
        
      </div>
     
        </div>
    );
}

export default Profile;