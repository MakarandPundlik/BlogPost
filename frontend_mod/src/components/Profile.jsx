import React, { useEffect, useState } from "react";
import ImageArray from "./ImagesData";
import upload_image from "../images/upload_image.png";
function Profile({ total, name, about }) {
  const [state, setState] = useState({
    profilepic: null,
  });

  const handleFileChange = (e) => {
    setState({ ...state, profilepic: e.target.files[0] });
    console.log(state.profilepic);
  };
  return (
   
      
      <div className="card m-3" style={{ maxWidth: "25rem" }}>
        {state.profilepic === null ? (
        <div className="m-1" style={{ textAlign: "center" }}>
          <img
            src={upload_image}
            className="rounded-circle"
            height="100rem"
            width="100rem"
            alt="..."
          />
        </div>
      ) : (
        <img
          src={state.profilepic}
          className="rounded-circle"
          height="100rem"
          width="100rem"
          alt="..."
        />
      )}

        <div className="card-body">
          <h5 className="card-title">{about}</h5>
        </div>

        <hr className="m-3" />
        <div className="card-body">
          <h5 className="card-title">Total blogs written : {total}</h5>
        </div>
        <hr className="m-3" />
        <div className="card-body">
          <h5 className="card-title">Total views : 10</h5>
        </div>
      </div>
   
  );
}

export default Profile;
