import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Cardschema from './Cardschema';
import Blogvalidator from '../services/Blogvalidator';
const API_URL = 'http://localhost:2020';
function Dashboard(props) {

  //for blog
  const [state,setState] = useState({
    title:'',
    data:''
  });
  //blog errors
  const [errors,setErrors] = useState({
    msg:'',
    status:false
  })
  //user token authentication
  const [redirect, setRedirect] = useState(false);

  
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

  }, [redirect]);

  

  

  //for fields handler
  const handleChange=(e)=>{
    e.preventDefault();
    setState({...state,[e.target.id]:e.target.value});
  }

//blog submission handler
const handleSubmit=(e)=>{
  e.preventDefault();
  let blog={};
       blog.title = state.title;
       blog.data = state.data;

       const auth = Blogvalidator(blog);  

       setErrors({
         msg:auth.msg,
         status:auth.status
       })
       if(errors.status)
       {
         console.log(blog);
         setState({
           title:'',
           data:''
         })
         
       }
}

  // logout handler
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();

    props.history.push("/login");
  }
  return (
    
    redirect ? (<Redirect to="/login"></Redirect>) : (
      <div>
        {/* Dropdown user menu */}
        <div className="dropdown" style={{ margin: '3rem', textAlign: 'right' }}>
          <button className="btn btn-dark dropdown-toggle rounded-pill" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {localStorage.getItem("username") &&
              localStorage.getItem("username").charAt(0).toLocaleUpperCase()}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><div className="dropdown-item" onClick={(e) => handleClick(e)}>Logout</div></li>
            <li><div className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Backdrop"> Add Blog</div></li>
          </ul>

          {/* Blog form*/}
          <div className="modal fade" id="Backdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header"><h5 className="modal-title" >Add Blog</h5></div>
                <div className="modal-body">
                {
                            errors.status &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>{errors.msg}</strong> .
                        </div>


                        }
                             
                  <form onSubmit={(e)=>handleSubmit(e)}>

                    <div className="mb-3">
                      <label className="form-label ">Blog Title</label>
                      <input type="text" className="form-control" id="title" onChange={(e)=>handleChange(e)} value={state.title}/>

                    </div>
                    <div className="mb-3">
                      <label className="form-label">Blog</label>
                      <textarea type="text" rows="5" className="form-control" id="data" onChange={(e)=>handleChange(e)} value={state.data}/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-dark" onClick={(e)=>handleSubmit(e)}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Call for the total blogs */}
        <div className="row  ">

          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />
          <Cardschema />


        </div>
      </div>
    )
  )
  
}

export default Dashboard;