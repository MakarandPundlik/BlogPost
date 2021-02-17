import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
const API_URL = 'http://localhost:2020';
function Dashboard(props) {
    let [users,setUsers] = useState(null);
    useEffect(async () => {
        if (!localStorage.getItem("accesstoken"))
            props.history.push('/login');
        const accesstoken = localStorage.getItem("accesstoken");
        await axios.get(`${API_URL}/api/authenticate`, {
            accesstoken
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accept-Encoding':'gzip, deflate, sdch'
                }
            })
            .then((res) => console.log(res))
            .catch((err) => {
                localStorage.removeItem("accesstoken");
                console.log(err)
            });
        //    await axios.get(`${API_URL}/`)
        //     .then((res)=>{
        //         setUsers(res.data);
        //         console.log(res.data);
        //         console.log(users);
        //     })
        //     .catch((err)=>console.log(err));
    }, [])
    return (
        <div>
            <h1>Welcome to userauth {localStorage.getItem("username")}</h1>
        </div>
    );
}

export default Dashboard;