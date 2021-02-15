import axios from 'axios';
const API_URL = 'http://localhost:2020'
const getUsers = ()=>{
    let totalusers;
    axios.get(`${API_URL}/`)
    .then((accounts)=>{
        console.log(accounts.data);
        return accounts.data;
    })
    .catch(err=>console.log(err));
    

}
export default getUsers;