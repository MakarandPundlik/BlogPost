import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Cardschema from "./Cardschema";
import Blogvalidator from "../services/Blogvalidator";
import Loading from "./Loading";
import ProfilePhoto from "./ProfilePhoto";
import ProfileInfo from "./ProfileInfo";
const API_URL = "http://localhost:2020";
function Dashboard(props) {
  //for blog
  const [state, setState] = useState({
    title: "",
    data: "",
  });
  //blog errors
  const [errors, setErrors] = useState({
    msg: "",
    status: false,
    myclass: "",
  });
  //user token authentication
  const [redirect, setRedirect] = useState(false);

  //user's blogs
  const [blogs, setBlogs] = useState([]);

  //loading spinner
  const [loading, setLoading] = useState(true);

  //user's profile
  const [user, setUser] = useState({
    username: "",
    total: 0,
    about: "",
    age: 0,
    gender: "",
    isAuthenticated: false,
    last_activity:0
  });
  useEffect(async () => {
    if (!localStorage.getItem("accesstoken")) setRedirect(true);

    await axios
      .post(
        `${API_URL}/api/getmyblogs`,
        { accesstoken: localStorage.getItem("accesstoken") },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (!res.data.isAuthenticated) {
          localStorage.clear();
          setRedirect(true);
        } else {
          let Blogs = res.data.blogArray;
          setUser({
            age: res.data.age,
            gender: res.data.gender,
            about: res.data.about,
            username: res.data.username,
            total: res.data.blogArray.length,
            isAuthenticated: true,
            last_activity:res.data.last_activity
          });
          console.log(user);
          setBlogs(Blogs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [blogs, user, redirect]);

  //for fields handler
  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.id]: e.target.value });
  };

  //blog submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    let blog = {};
    blog.title = state.title;
    blog.data = state.data;

    const auth = Blogvalidator(blog);

    setErrors({
      msg: auth.msg,
      myclass: auth.myclass,
    });

    if (auth.flag) {
      //add blog to the database
      await axios
        .post(
          `${API_URL}/api/addblog`,
          {
            accesstoken: localStorage.getItem("accesstoken"),
            blog: {
              title: state.title,
              data: state.data,
              author: user.username,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (!res.data.isAuthenticated) setRedirect(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //set back the original state
    setState({
      title: "",
      data: "",
    });
  };

  // logout handler
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();

    props.history.push("/login");
  };
  return redirect ? (
    <Redirect to="/login"></Redirect>
  ) : loading ? (
    <Loading />
  ) : (
    <div style={{marginTop:"10%"}}>
      {/* Display the profile card */}

      <ProfilePhoto gender={user.gender} />
      {/* Dropdown user menu */}
      <div className="dropdown m-3" style={{ textAlign: "right"}}>
        <button
          className="btn custom-btn dropdown-toggle rounded-pill"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.username.charAt(0).toUpperCase()}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <div className="dropdown-item" onClick={(e) => handleClick(e)}>
              Logout
            </div>
          </li>
          <li>
            <div
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#Backdrop"
            >
              {" "}
              Add Blog
            </div>
          </li>
        </ul>

        {/* Blog form*/}
        <div
          className="modal fade"
          id="Backdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
        
        >
          <div className="modal-dialog text-center" >
            <div className="modal-content"  style={{color:"#ffffff",backgroundColor:"#008ac0"}}>
              <div className="modal-header">
                <h5 className="modal-title text-center">Add Blog</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-3">
                    {errors.myclass && (
                      <div className={errors.myclass} role="alert">
                        <strong>{errors.msg}</strong> .
                      </div>
                    )}
                      
                    <label className="form-label ">Blog Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      onChange={(e) => handleChange(e)}
                      value={state.title}
                    />
                  </div>
                  <div className="mb-3 ">
                    <label className="form-label">Blog</label>
                    <textarea
                      type="text"
                      rows="5"
                      className="form-control"
                      id="data"
                      onChange={(e) => handleChange(e)}
                      value={state.data}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn modal-btn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn modal-btn"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileInfo name={user.username} age={user.age} about={user.about} total={user.total} last_activity={user.last_activity}/>             
      <hr className="m-5" />
      {/* Call for the total blogs */}

      <div className="row">
        {
          blogs.length>0? 
          <div className="h3 my-5">Here are your blogs</div>
          :null
        }
        {
        blogs && 
           
          blogs.map((blog) => {
            return (
              <Cardschema
                key={blog._id}
                title={blog.title}
                data={blog.data}
                author={blog.author}
                date={blog.date}
                isAuthenticated={user.isAuthenticated}
                id={blog._id}
              />
            );
          })}
      </div>
      {!blogs.length && (
        <div className="h3 text-secondary">
          You haven't written any blogs yet!
        </div>
      )}
    </div>
  );
}

export default Dashboard;
