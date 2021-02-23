import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tablerow from './Tablerow';
const API_URL = "http://localhost:2020/"
function Homepage(props) {
  const [flag,setFlag] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        const data = res.data.users;
        //console.log(data);
        setUsers([...users, data]);
        // console.log(users);

      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    
    getUsers();
  }, []);

  useEffect(()=>{
   console.log(users)
  },[users]);
  return (
    <div>
      {
        users &&
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
          {
            users.forEach((user)=>console.log(user))
            // users.map((user,index)=>{
            // return(<Tablerow user={user} index={index} key={index}/>)
            // })
          }
          </tbody>
        </table>
      }
    </div>



  );

}

export default Homepage;