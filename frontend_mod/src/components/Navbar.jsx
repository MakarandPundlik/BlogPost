import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const light = "navbar navbar-light bg-light navbar-expand-lg fixed-top";
const dark = "navbar navbar-dark bg-dark navbar-expand-lg fixed-top";

function Navbar(props) {
 
  const getDefaultTheme=()=> {
    const selectedTheme = JSON.parse(localStorage.getItem('dark'))
    return selectedTheme || false
  }
  const [darkTheme,setDarkTheme] = useState(getDefaultTheme());

  useEffect(async()=>{
    await localStorage.setItem('dark',JSON.stringify(darkTheme));
    document.body.style.backgroundColor = darkTheme?"#000000":"#ffffff"
  },[darkTheme]);


  
  return (
    <nav className={darkTheme?dark:light}>
      <div className="container-fluid">
        <NavLink className="navbar-brand " to="/">
          BlogPost
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0 d-flex">
            <li className="nav-item">
              <NavLink className="nav-link active " aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active "
                aria-current="page"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active "
                aria-current="page"
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link active "
                aria-current="page"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li onClick={()=>setDarkTheme(prevTheme=>!prevTheme)} className="mx-1 ">
             
            {darkTheme?
           <ion-icon name="contrast-outline"  style={{color:"#ffffff",fontSize:"28px"}}></ion-icon>
           :<ion-icon name="contrast-outline" style={{fontSize:"28px"}}></ion-icon>}
              
            </li>
          </ul>
          {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
