import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from './Loading';
import { Redirect, useLocation } from "react-router";
const API_URL = "http://localhost:2020";
function EditPofile(props) {
  const [loading,setLoading] = useState(true);

  const location = useLocation();

  const [currentProfile, setCurrentProfile] = useState({
    firstname: location.user.firstname,
    lastname: location.user.lastname,
    email: location.user.email,
    age: location.user.age,
    gender: location.user.gender,
  });
  const [newProfile, setNewProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: 0,
    gender: "",
  });

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.id]: e.target.value });
  };
  useEffect(async () => {
    if (!localStorage.getItem("accesstoken")) 
    props.history.push("/login");

    if(currentProfile!==null)
      setLoading(false);
   
    if(location.user===undefined)
      props.history.push("/dashboard");

  }, [currentProfile]);
  return (
   loading?<Loading/>: <div className="row d-flex justify-content-center" style={{ alignItems: "center", marginTop: "5rem" }}>
   <div className="card col-5">
     <div className="card-body">
       <form>
         <div className="mb-3">
           <label className="form-label">First Name</label>
           <div className="input-group">
             <span className="input-group-text">
               <ion-icon
                 name="person-outline"
                 style={{ color: "#4bcbeb", fontSize: "24px" }}
               ></ion-icon>
             </span>
             <input
               type="text"
               className="form-control"
               id="firstname"
               placeholder={currentProfile.firstname}
               value={currentProfile.firstname}
               
             />
           </div>
         </div>
         <div className="mb-3">
           <label className="form-label">Last Name</label>
           <div className="input-group">
             <span className="input-group-text">
               <ion-icon
                 name="person-outline"
                 style={{ color: "#4bcbeb", fontSize: "24px" }}
               ></ion-icon>
             </span>
             <input
               type="text"
               className="form-control"
               id="lastname"
               placeholder={currentProfile.lastname}
               value={currentProfile.lastname}
               
             />
           </div>
         </div>
         <div className="mb-3">
           <label className="form-label">Email address</label>
           <div className="input-group">
             <span className="input-group-text">
               <ion-icon
                 name="mail-outline"
                 style={{ color: "#4bcbeb", fontSize: "24px" }}
               ></ion-icon>
             </span>
             <input
               type="email"
               className="form-control"
               id="email"
               placeholder={currentProfile.email}
               value={currentProfile.email}
               
             />
           </div>
         </div>
         
       </form>
     </div>
   </div>
 </div>
  );
}

export default EditPofile;
