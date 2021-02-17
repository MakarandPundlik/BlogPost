import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoginValidator } from '../services/Validator';
import { Redirect } from 'react-router-dom';
const API_URL = 'http://localhost:2020';

function Login(props) {
    useEffect(()=>{
        if(localStorage.getItem("accesstoken"))
            props.history.push('/dashboard');
         
    },[])
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {

        setState({ ...state, [e.target.id]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let profile = {
            email: '',
            password: ''
        };
        profile.email = state.email;
        profile.password = state.password;

        let auth = LoginValidator(profile);
        alert(auth.msg);

        axios.post(`${API_URL}/api/login`,{profile},{
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Access-Control-Allow-Origin': '*'
            }  
        })
        .then((res)=>{
            if(!res.data.errors)
                {
                    localStorage.setItem("accesstoken",res.data.accesstoken);
                    props.history.push('/dashboard');
                }
                else
                console.log(res.data);
        })
        .catch((err)=>console.log(err));

        setState({
            email: '',
            password: '',

        });
    }
    return (
        <div className="container col-md-3 col-sm-8 my-5">
            <h3>Log In</h3>
            <form>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={state.email} onChange={(e) => handleChange(e)} />

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={state.password} onChange={(e) => handleChange(e)} />
                </div>

                <button type="submit" className="btn btn-dark" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default Login;