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
    if (new Date().getTime() - localStorage.getItem("setuptime") >= 60 * 60 * 1000) {
      localStorage.clear();
      setRedirect(true);
    }

    if (localStorage.getItem("accesstoken") == null || localStorage.getItem("username") == null || localStorage.getItem("setuptime") == null) {
      localStorage.clear();
      setRedirect(true);
    }


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

        <div class="dropdown" style={{ margin: '3rem', textAlign: 'right' }}>
          <button class="btn btn-dark dropdown-toggle rounded-pill" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {localStorage.getItem("username") &&
              localStorage.getItem("username").charAt(0).toLocaleUpperCase()}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><div className="dropdown-item" onClick={(e) => handleClick(e)}>Logout</div></li>
            <li><div className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Backdrop"> Add Blog</div></li>
          </ul>
          <div class="modal fade" id="Backdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header"><h5 class="modal-title" >Add Blog</h5></div>
                <div class="modal-body">
                  <form >

                    <div class="mb-3">
                      <label className="form-label ">Blog Title</label>
                      <input type="text" className="form-control" id="title" />

                    </div>
                    <div className="mb-3">
                      <label className="form-label">Blog</label>
                      <input type="text" className="form-control" id="data" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-dark">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
         
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
            <Cardschema/>
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