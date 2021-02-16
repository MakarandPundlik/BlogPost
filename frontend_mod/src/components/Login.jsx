import React, { useState } from 'react';
import { authLogin } from '../services/Users';
import { LoginValidator } from '../services/Validator';
function Login(props) {
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

        const auth = LoginValidator(profile);
        alert(auth.msg);
        if (auth.status)
            authLogin(profile);
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