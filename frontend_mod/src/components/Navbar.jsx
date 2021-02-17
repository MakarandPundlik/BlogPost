import React,{useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

const dark = "navbar navbar-dark bg-dark navbar-expand-lg ";
const light = "navbar navbar-light navbar-expand-lg ";

const handleClcik = (e) =>{
  e.preventDefault();
  localStorage.removeItem("accesstoken");
 
}
function Navbar(props) {
  const [flag,setFlag] = useState(false);
  useEffect(()=>{
    if(!localStorage.getItem("accesstoken"))
      setFlag(false);
    else 
      setFlag(true);
  },[flag]);

    const [theme,setTheme] = useState(dark);
    return (
        <nav className={theme}>
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">User Auth</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/signup">Signup</NavLink>
        </li>
       <li>
       <NavLink className="nav-link active" aria-current="page" to="/dashboard">Dashboard</NavLink>
       </li>
       {
         flag &&
         <li>
         <button type="button" className="btn btn-danger" onClick={(e)=>handleClcik(e)}>Logout</button>
         </li>
       }
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