import React, { useState } from 'react';
import { authSignup } from '../services/Users';
import { SignupValidator } from '../services/Validator';
function Signup(props) {
    const [state, setState] = useState({
        email: '',
        password: '',
        conpassword: '',
        firstname: '',
        lastname: ''
    })
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
        alert(auth.msg);
        if (auth.status)
            authSignup(profile);
        setState({
            email: '',
            password: '',
            conpassword: '',
            firstname: '',
            lastname: ''
        });
    }
    return (
        <div>
            <div className="container col-md-3 col-sm-8 my-5">

                <h3>Sign Up</h3>
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
    );
}

export default Signup;