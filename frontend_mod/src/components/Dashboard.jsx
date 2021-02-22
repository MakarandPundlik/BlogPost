import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../images/Loading.gif';
const API_URL = 'http://localhost:2020';
function Dashboard(props) {
    let [users, setUsers] = useState(null);
    let [redirect, setRedirect] = useState(false);
    let [loading, setLoading] = useState(true);
    useEffect(async () => {
        if (localStorage.getItem("accesstoken") == null)
            setRedirect(true);


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
                console.log(res.data)
                
            })
            .catch((err) => {
                localStorage.removeItem("accesstoken");
                console.log(err)
            });

    }, [redirect,loading])
    return (
        // loading ? ( <img src={Loading}/>) : (
             redirect ? (<Redirect to="/login"></Redirect>) : (
                <div>
                    <h1>Welcome to userauth {localStorage.getItem("username")}</h1>
                </div>
            )
         )
    //)
}

export default Dashboard;