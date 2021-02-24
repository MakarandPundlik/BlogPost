import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Cardschema from './Cardschema';
const API_URL = 'http://localhost:2020';
function Dashboard(props) {
  let [users, setUsers] = useState(null);
  let [redirect, setRedirect] = useState(false);
  let [loading, setLoading] = useState(true);
  useEffect(async () => {
    if (new Date().getTime() - localStorage.getItem("setuptime") >= 60 * 60 * 1000)
      localStorage.clear();

    if (localStorage.getItem("accesstoken") == null)
      setRedirect(true);


    await axios.post(`${API_URL}/api/authenticate`, {
      accesstoken: localStorage.getItem("accesstoken")
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((res) => {
        if (!res.data.isAuthenticated) {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("username");
        }
      })
      .catch((err) => {
        localStorage.removeItem("accesstoken");
        console.log(err)
      });

  }, [redirect, loading]);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();

    props.history.push("/login");
  }
  return (
    // loading ? ( <img src={Loading}/>) : (
    redirect ? (<Redirect to="/login"></Redirect>) : (
      <div>
       
       <div class="dropdown" style={{margin:'3rem',textAlign:'right'}}>
  <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    {localStorage.getItem("username").toLocaleUpperCase()}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><div className="dropdown-item" onClick={(e)=>handleClick(e)}>Logout</div></li>
    <li><a className="dropdown-item">Add a blog</a></li>
    <li><a className="dropdown-item">Bookmark</a></li>
  </ul>
</div>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
        <Cardschema/>
        <Cardschema/>
        <Cardschema/>
        <Cardschema/>
        </div>
      </div>
    )
  )
  //)
}

export default Dashboard;