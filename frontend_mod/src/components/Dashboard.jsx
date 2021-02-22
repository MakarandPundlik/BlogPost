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


        await axios.get(`${API_URL}/api/authenticate`, {
            accesstoken: localStorage.getItem("accesstoken")
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accept-Encoding': 'gzip, deflate, sdch'
                }
            })
            .then((res) => console.log(res))
            .catch((err) => {
                localStorage.removeItem("accesstoken");
                console.log(err)
            });

    }, [redirect])
    return (
        loading ? ( <img src={Loading}/>) : (
            redirect ? (<Redirect to="/login"></Redirect>) : (
                <div>
                    <h1>Welcome to userauth {localStorage.getItem("username")}</h1>
                </div>
            )
        )
    )
}

export default Dashboard;