import axios from 'axios';
const API_URL = 'http://localhost:2020'
export const getUsers = async()=>{
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
export const authSignup = async(profile) =>{
    await axios.post(`${API_URL}/api/signup`,{profile},{
        headers: { 'Content-Type': 'application/json;charset=UTF-8',
         "Access-Control-Allow-Origin": "*", 
         "Accept": "application/json" }
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
}

export const authLogin = async(profile) =>{
    await axios.post(`${API_URL}/api/login`,{profile},{
        headers: { 'Content-Type': 'application/json;charset=UTF-8',
         "Access-Control-Allow-Origin": "*", 
         "Accept": "application/json" }
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
}