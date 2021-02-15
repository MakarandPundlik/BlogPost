import React, { useState } from 'react';
import Validator from '../services/Validator';
function Signup(props) {
    let [state, setState] = useState({
        email: '',
        password: '',
        conpassword: '',
        firstname: '',
        lastname: ''
    })
    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }
    const handleSubmit = () =>{
        let profile = {};
        profile.email=state.email;
        profile.password=state.password;
        profile.conpassword=state.conpassword;
        profile
    }
    return (
        <div>
            <div className="container col-md-3 col-sm-8 my-5" onChange={() => handleChange}>
                <h3>Sign Up</h3>
                <form>
                    <div class="mb-3">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" id="firstname" />

                    </div>
                    <div class="mb-3">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastname" />

                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" />

                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="conpassword" />
                    </div>
                    <button type="submit" class="btn btn-dark">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;