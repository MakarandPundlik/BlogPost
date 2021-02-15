import React from 'react';

function Login(props) {
    return (
        <div className="container col-md-3 col-sm-8 my-5">
            <h3>Log In</h3>
            <form>
            
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                    
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" />
                </div>
                
                <button type="submit" class="btn btn-dark">Submit</button>
            </form>
        </div>
    );
}

export default Login;