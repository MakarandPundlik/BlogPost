import React,{useState,useEffect} from 'react';
import axios from 'axios';
const API_URL = "http://localhost:2020/"
function Homepage(props) {
    const [users,setUsers] = useState([]);
    const getUsers=async()=>{
        await axios.get(API_URL,{
            headers:{
                'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res)=>{
           const data = res.data.users;
            console.log(data);
           setUsers([...users,data]);
           console.log(users);
           
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        
        getUsers();
    },[])
    return (
        users?(<div style={{ marginTop: '25%' }}>
        <div className="spinner-border" role="status">
        </div>
        </div>):(
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
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        )
    );
}

export default Homepage;