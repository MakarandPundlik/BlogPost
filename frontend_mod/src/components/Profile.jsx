import React, { useEffect, useState } from "react";
import ImageArray from "./ImagesData";
import upload_image from "../images/upload_image.png";
function Profile({ total, name }) {
  const [state, setState] = useState({
    profilepic: null,
  });

  const handleFileChange = (e) => {
    setState({ ...state, profilepic: e.target.files[0] });
    console.log(state.profilepic);
  };
  return (
    
      <div className="card" style={{maxWidth:"30rem"}}>
        <h5 className="card-title m-2">
          {name.toLocaleUpperCase()}
        </h5>
        <div className="text-center m-3">
          {state.profilepic === null ? (
            <div>
              <img
                src={upload_image}
                className="rounded-circle"
                height="200px"
                width="200px"
                alt="..."
              />
              <input type="file" />
              <button onClick={handleFileChange}>Upload</button>
            </div>
          ) : (
            <img
              src={state.profilepic}
              className="rounded-circle"
              height="20rem"
              width="20rem"
              alt="..."
            />
          )}
        </div>
        <hr className="m-3"/>
        <div className="card-body">
          <h5 className="card-title">Total blogs written : {total}</h5>
        </div>
        <hr className="m-3"/>
        <div className="card-body">
          <h5 className="card-title">Total views : 10</h5>
        </div>
      </div>
   
  );
}

export default Profile;
