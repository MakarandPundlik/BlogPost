import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({component,...rest}) {
    const auth = false;
    return (
        <Route {...rest} render={()=>auth?{component}:<Redirect to="/login"></Redirect>} />  
    );
}

export default ProtectedRoute;