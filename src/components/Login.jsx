import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoginValidator } from "../services/Validator";
import { Link, Redirect } from "react-router-dom";
import Loading from "./Loading";
const API_URL = "http://localhost:2020";

function Login(props) {
  const [errors, setErros] = useState({
    title: "",
    text: "",
    myclass: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accesstoken")) props.history.push("/dashboard");
  }, [loading, errors]);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let profile = {
      email: "",
      password: "",
    };
    profile.email = state.email;
    profile.password = state.password;

    let auth = LoginValidator(profile);

    //set loading to true
    if (auth.status) {
      setLoading(true);
      axios
        .post(
          `${API_URL}/api/login`,
          { profile },
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
            setLoading(true);
          } else {
            setErros({
              title: "Please check your credentials",
              myclass: "alert alert-danger alert-dismissible fade show",
            });
            setLoading(false);
          }
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

  //classes fot theme
  const bglight = "card shadow-lg my-5 bg-light";

  return loading ? (
    <Loading />
  ) : (
    <div
      className="row my-5 d-flex justify-content-center"
      style={{ textAlign: "center" }}
    >
      <div className={bglight} style={{ width: "25rem" }}>
        <div className="card-body">
          {errors.title && (
            <div className={errors.myclass} role="alert">
              <strong>{errors.title}!</strong> {errors.text}.
            </div>
          )}
          <h5 className="card-title">Log In</h5>
          <form onSubmit={(e) => handleSubmit(e)}>
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

            <button
              type="submit"
              className="btn custom-btn"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
         <div className="my-3">
         Don't have an account?<Link to="/signup" className="link"> Register</Link>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
