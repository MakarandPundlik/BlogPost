import axios from 'axios';
const API_URL = 'http://localhost:2020'
const getUsers = async()=>{
    let users =[];
    users = await axios.get(`${API_URL}/`)
    .then(()=>console.log('got total users'))
    .catch(err=>console.log(err));

  
}
export default getUsers;