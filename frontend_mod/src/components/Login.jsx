import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoginValidator } from '../services/Validator';
import { Redirect } from 'react-router-dom';
import Loading from '../images/Loading.gif';
const API_URL = 'http://localhost:2020';

function Login(props) {
    const [errors, setErros] = useState({
        title: '',
        text: '',
        myclass: ''
    })
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("accesstoken"))
            props.history.push('/dashboard');

    }, [loading, errors])
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


        //set loading to true
        if (auth.status) {
            setLoading(true);
            axios.post(`${API_URL}/api/login`, { profile },{ credentials: 'include'}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then((res) => {
                    if (!res.data.errors) {
                        localStorage.setItem("accesstoken", res.data.accesstoken);
                        localStorage.setItem("username", res.data.username);
                        
                        localStorage.setItem("setuptime",new Date().getTime());
                        props.history.push('/dashboard');
                        setLoading(true);
                    }
                    else {
                        
                        setErros({
                            title:'PLease check your credentials',
                            myclass:'alert alert-danger alert-dismissible fade show'
                        })
                        setLoading(false);
                    }
                })
                .catch((err) => console.log(err));
        }

        else {
            setErros({
                title: auth.title,
                text: auth.text,
                myclass: auth.myclass
            })

        }


        
    }
    //
    return (
        loading ? (<div style={{ marginTop: '20%' }}>
            <div className="spinner-border" role="status">

            </div>
        </div>) : (
                <div className="container my-5">
                     <div style={{marginLeft:'30%'}}>                   
                      <div className="card shadow-lg" style={{width:'25rem'}}>
                            <div className="card-body">
                                 {
                            errors.title &&
                            <div className={errors.myclass} role="alert">
                                <strong>{errors.title}!</strong> {errors.text}.
                        </div>


                        }
                                <h5 className="card-title">Log In</h5>
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
                    </div>
                </div>
                </div>

            )
    );
}

export default Login;