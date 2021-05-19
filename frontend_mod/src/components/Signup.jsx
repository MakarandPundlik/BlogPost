import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { SignupValidator } from "../services/Validator";
import axios from "axios";

const API_URL = "http://localhost:2020";
function Signup(props) {
  const [errors, setErros] = useState({
    title: "",
    text: "",
    myclass: "",
  });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    conpassword: "",
    firstname: "",
    lastname: "",
    about: "",
    age: "",
  });
  const [gender, setGender] = useState("");
  useEffect(() => {
    if (localStorage.getItem("accesstoken")) props.history.push("/dashboard");
  }, [loading, errors]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.id === "female" ? "female" : "male");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let profile = {
      email: "",
      password: "",
      conpassword: "",
      firstname: "",
      lastname: "",
      about: "",
      age: 18,
      gender: "",
    };
    profile.email = state.email;
    profile.password = state.password;
    profile.conpassword = state.conpassword;
    profile.firstname = state.firstname;
    profile.lastname = state.lastname;
    profile.about = state.about;
    profile.age = state.age;
    profile.gender = gender;

    const auth = SignupValidator(profile);

    if (auth.status) {
      setLoading(true);
      axios
        .post(
          `${API_URL}/api/signup`,
          { profile },
          { credentials: "include" },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          if (!res.data.errors) {
            localStorage.setItem("accesstoken", res.data.accesstoken);
            props.history.push("/dashboard");
          } else {
            console.log(res.data);

            setErros({
              title: "User already exists",
              myclass: "alert alert-danger alert-dismissible fade show",
            });
          }

          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setErros({
        title: auth.title,
        text: auth.text,
        myclass: auth.myclass,
      });
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div style={{ marginTop: "3.5rem" }}>
      <div className="alert">
        {errors.title && (
          <div className={errors.myclass} role="alert">
            <strong>{errors.title}!</strong> {errors.text}.
          </div>
        )}
      </div>
      <div className="container my-1">
        <div className="row d-flex justify-content-around">
          <div className="card shadow-lg my-3" style={{ width: "27rem" }}>
            <div className="card-body">
              <h5 className="card-title">Sign Up</h5>

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
                      value={state.firstname}
                      onChange={(e) => handleChange(e)}
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
                      value={state.lastname}
                      onChange={(e) => handleChange(e)}
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
                      value={state.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <ion-icon
                        name="lock-closed-outline"
                        style={{ color: "#4bcbeb", fontSize: "24px" }}
                      ></ion-icon>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={state.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <ion-icon
                        name="lock-closed-outline"
                        style={{ color: "#4bcbeb", fontSize: "24px" }}
                      ></ion-icon>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="conpassword"
                      value={state.conpassword}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow-lg my-3" style={{ width: "27rem" }}>
            <div className="card-body">
              <h5 className="card-title">Personal Info</h5>

              <form onSubmit={(e) => handleSubmit(e)}>
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
                    min={0}
                    max={100}
                    type="number"
                    className="form-control"
                    id="age"
                    value={state.age}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                </div>
                <label className="form-label">Gender</label>
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

                <div className="mb-3">
                  <label className="form-label">About</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    id="about"
                    value={state.about}
                    onChange={(e) => handleChange(e)}
                  />
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
      </div>
    </div>
  );
}

export default Signup;
