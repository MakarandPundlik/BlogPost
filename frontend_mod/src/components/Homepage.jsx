import React,{useState,useEffect} from 'react';
import axios from 'axios';
const API_URL = "http://localhost:2020/"
function Homepage(props) {
    let [users,setUsers] = useState([]);
    useEffect(async()=>{
        await axios.get(API_URL,{
            headers:{
                'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res)=>{
           const data = res.data.users;
          
           setUsers(users=>[...users,data]);
           console.log(users);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return (
        <div>
            
        </div>
    );
}

export default Homepage;