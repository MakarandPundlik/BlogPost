import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import ImageArray from "./ImagesData";
import fullblog from "../images/fullblog.jpg";
import axios from "axios";
const API_URL = "http://localhost:2020";
function Fullblog(props) {
  
  //setting up location sent from previous call
  const location = useLocation();

  //redirect after blog has been deleted
  const [redirect, setRedirect] = useState(false);

  //setting state to read full blog
  const [state, setState] = useState({
    title: location.state.title,
    data: location.state.data,
    author: location.state.author,
    isAuthenticated: location.state.isAuthenticated,
    id: location.state.id,
    date: location.state.date,
    views: location.state.views,
    comments: location.state.comments,
  });

  useEffect(() => {
    // console.log(state.comments);
  }, [state]);

  //state for comments
  const [comment, setComment] = useState({
    data: "",
    name: "",
  });

  //handle comment
  const handleChange=(e)=>{
    setComment({...comment,[e.target.id]:e.target.value})
  }
  //handle comment submit
  const handleSubmit = async(e) =>{
    e.preventDefault();
    //console.log(comment);
    await axios.post(`${API_URL}/api/addcomment`,{
      id:state.id,
      data:comment.data,
      name:comment.name
    },{
      headers:{
        "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  //handle edits
  const handleEdit = () => {
    console.log("please enter the edited blog");
  };

  //handle delete
  const handleDelete = async () => {
    await axios
      .post(
        `${API_URL}/api/deleteblog`,
        {
          accesstoken: localStorage.getItem("accesstoken"),
          _id: state.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(state.id);
  };

  return redirect ? (
    <Redirect to="/dashboard"></Redirect>
  ) : (
    <div style={{ marginTop: "10%" }}>
      <div className="card mx-auto m-5" style={{ maxWidth: "750px" }}>
        <img src={fullblog} className="card-img-top" alt="blog-image" height="450rem"/>
        <div className="card-body">
          {location.state.isAuthenticated && (
            <div className="text-right">
              <button
                className="btn custom-btn m-1"
                onClick={() => handleEdit()}
              >
                Edit
              </button>
              <button className="btn custom-btn" onClick={() => handleDelete()}>
                Delete
              </button>
            </div>
          )}
          <h4 className="card-title">{state.title}</h4>
          <hr />
          <h5 className="card-text">{state.data}</h5>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-around my-3">
            <h5>Created On :- {state.date}</h5>
            <h5>Total Views :- {state.views}</h5>
            <h5>Contributer :- {state.author}</h5>
          </div>
          <hr />
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Comment here"
              id="data" 
              onChange={(e)=>handleChange(e)}
              aria-describedby="button-addon2"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name"
              onChange={(e)=>handleChange(e)}
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-homepage"
              type="button"
              id="button-addon2"
              onClick={(e)=>handleSubmit(e)}
            >
              Add Comment
            </button>
          </div>
          <h4 className="text-left">Comments :-</h4>
          <ul className="list-group">
            {state.comments.map((comment) => {
              return (
                <li className="list-group-item " key={comment._id} style={{color:"#4bcbeb"}}>
                  <h5 className="text-left">{comment.data}</h5>
                  <p className="text-right">-{comment.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Fullblog;
