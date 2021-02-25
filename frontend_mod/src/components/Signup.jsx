import React, { useState, useEffect } from 'react';

import { SignupValidator } from '../services/Validator';
import axios from 'axios';

const API_URL = 'http://localhost:2020'
function Signup(props) {
    const [errors, setErros] = useState({
        title: '',
        text: '',
        myclass: ''
    })

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
        conpassword: '',
        firstname: '',
        lastname: ''
    });

    useEffect(() => {
        if (localStorage.getItem("accesstoken"))
            props.history.push('/dashboard');

    }, [loading, errors])
    const handleChange = (e) => {

        setState({ ...state, [e.target.id]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let profile = {
            email: '',
            password: '',
            conpassword: '',
            firstname: '',
            lastname: ''
        };
        profile.email = state.email;
        profile.password = state.password;
        profile.conpassword = state.conpassword;
        profile.firstname = state.firstname;
        profile.lastname = state.lastname;

        const auth = SignupValidator(profile);


        if (auth.status) {
            setLoading(true);
            axios.post(`${API_URL}/api/signup`, { profile }, {
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
                        localStorage.setItem("setuptime", new Date().getTime());

                        props.history.push('/dashboard');
                    }

                    else {

                        console.log(res.data);

                        setErros({
                            title: 'User already exists',
                            myclass: 'alert alert-danger alert-dismissible fade show'
                        })
                    }

                    setLoading(false);
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
    return (
        loading ? (<div style={{ marginTop: '20%' }}>
            <div className="spinner-border" role="status">

            </div>
        </div>) : (
                <div>
                    <div className="container my-5" >
                       <div style={{marginLeft:'30%'}}>
                        <div class="card shadow-lg" style={{width:'25rem'}}>
                            <div class="card-body">
                                 {
                            errors.title &&
                            <div className={errors.myclass} role="alert">
                                <strong>{errors.title}!</strong> {errors.text}.
                        </div>


                        }
                                <h5 class="card-title">Sign Up</h5>
                                
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" value={state.firstname} onChange={(e) => handleChange(e)} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" value={state.lastname} onChange={(e) => handleChange(e)} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={state.email} onChange={(e) => handleChange(e)} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={state.password} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="conpassword" value={state.conpassword} onChange={(e) => handleChange(e)} />
                        </div>
                        <button type="submit" className="btn btn-dark" onClick={(e) => handleSubmit(e)}>Submit</button>
                    </form>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            )
    );
}

export default Signup;