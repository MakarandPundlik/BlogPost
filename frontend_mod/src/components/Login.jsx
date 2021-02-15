import React, { useState } from 'react';
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

        let profile = {};
        profile.email = state.email;
        profile.password = state.password;

        const auth = LoginValidator(profile);
        alert(auth.msg);
        setState({
            email: '',
            password: '',

        });
    }
    return (
        <div className="container col-md-3 col-sm-8 my-5">
            <h3>Log In</h3>
            <form>

                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" value={state.email} onChange={(e) => handleChange(e)} />

                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" value={state.password} onChange={(e) => handleChange(e)} />
                </div>

                <button type="submit" class="btn btn-dark" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default Login;