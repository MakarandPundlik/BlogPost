import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Redirect, useLocation } from "react-router";
const API_URL = "http://localhost:2020";
function EditPofile(props) {
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const [currentProfile, setCurrentProfile] = useState({
    firstname: location.user.firstname,
    lastname: location.user.lastname,
    email: location.user.email,
    age: location.user.age,
    gender: location.user.gender,
  });
  const [newProfile, setNewProfile] = useState({
    firstname: location.user.firstname,
    lastname: location.user.lastname,
    email: location.user.email,
    age: location.user.age,
    gender: location.user.gender,
  });

  //edit the new profile
  const handleGenderChange = (e) => {
    setNewProfile({
      ...newProfile,
      gender: e.target.id === "female" ? "female" : "male",
    });
    console.log(newProfile);
  };
  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.id]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(newProfile);
    await axios.post(`${API_URL}/api/editprofile`,{
      firstname:newProfile.firstname,
      lastname:newProfile.lastname,
      email:newProfile.lastname,
      age:newProfile.age,
      gender:newProfile.gender
    },
    {
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Access-Control-Allow-Origin":"*"
      }
    })
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  useEffect(async () => {
    if (!localStorage.getItem("accesstoken")) props.history.push("/login");

    if (currentProfile !== undefined) setLoading(false);

    if (location.user === null) {
      setLoading(true);
      props.history.push("/dashboard");
    }
  }, [currentProfile]);
  return loading ? (
    <Loading />
  ) : (
    <div
      className="row d-flex justify-content-center"
      style={{ alignItems: "center", marginTop: "5rem" }}
    >
      <div className="card col-4">
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  value={currentProfile.email}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <div className="input-group">
                <span className="input-group-text">
                  <ion-icon
                    name="calendar-number-outline"
                    style={{ color: "#4bcbeb", fontSize: "24px" }}
                  ></ion-icon>
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder={currentProfile.age}
                  onChange={(e) => handleChange(e)}
                  value={currentProfile.age}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="custom-control-input"
                  onChange={(e) => handleGenderChange(e)}
                />
                <label className="custom-control-label" htmlFor="male">
                  <ion-icon
                    name="male-outline"
                    style={{ color: "#4bcbeb", fontSize: "28px" }}
                  ></ion-icon>
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="custom-control-input"
                  onChange={(e) => handleGenderChange(e)}
                />
                <label className="custom-control-label" htmlFor="female">
                  <ion-icon
                    name="female-outline"
                    style={{ color: "#4bcbeb", fontSize: "28px" }}
                  ></ion-icon>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn custom-btn"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPofile;
