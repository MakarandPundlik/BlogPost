import React, { useEffect, useState } from "react";
import ImageArray from "./ImagesData";
import male from '../images/male.jpeg';
import female from '../images/female.jpeg';
function ProfilePhoto({ gender }) {
  const [state, setState] = useState({
    profilepic: null,
  });

  const handleFileChange = (e) => {
    setState({ ...state, profilepic: e.target.files[0] });
    console.log(state.profilepic);
  };
  return (
   
      
      
        <div className="m-5" style={{ textAlign: "left" }}>
          {
            gender==="female"?
            <img
            src={female}
            className="rounded-circle"
            height="50rem"
            width="50rem"
            alt="..."
          />
          : <img
          src={male}
          className="rounded-circle"
          height="50rem"
          width="50rem"
          alt="..."
        />
          }
        </div>
      
      
     
   
  );
}

export default ProfilePhoto;
