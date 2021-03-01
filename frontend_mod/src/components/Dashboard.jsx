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
    status:false,
    myclass:''
  })
  //user token authentication
  const [redirect, setRedirect] = useState(false);

  
  useEffect(async () => {
   

    //token verification
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
         
         myclass:auth.myclass
       })
       
       setState({
         title:'',
         data:''
       })
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
                
                  <form onSubmit={(e)=>handleSubmit(e)}>

                    <div className="mb-3">
                    {
                            errors.myclass &&
                            <div className={errors.myclass} role="alert">
                                <strong>{errors.msg}</strong> .
                        </div>


                        }
                            
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
         
        </div>
      </div>
    )
  )
  
}

export default Dashboard;