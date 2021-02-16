import axios from 'axios';
const API_URL = 'http://localhost:2020'
const getUsers = async()=>{
    let totalUsers;
    try {
       totalUsers = await axios.get(`${API_URL}/`)
       console.log(totalUsers.data);
       return totalUsers.data
    }
   
    
     catch (error) {
        console.log(error);
    }

}
export default getUsers;