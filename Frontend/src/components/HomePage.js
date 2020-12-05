import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import axios from 'axios';
const API_URL = "http://localhost:2020/"



const styles = {
	button: {
		margin: 15,
		color: '#AC3B61',
		background: '#ffffff',
		fontWeight: 'bold',
    },
	floatingLabelFocusStyle: {
		color: "#F9A257"
	},
};
let row =[];
let totalUsers=[];
const handleClick=(e)=>{
  e.preventDefault();
  axios.get(`${API_URL}`,{
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json",

      }
  })
  .then((res)=>{
      
      totalUsers=res.data.users.map(user=>{
          return (user)
      })
      console.log(totalUsers)
      
  })
  .catch(err=>{
      console.log(err);
  })
}
const HomePage = () =>{
   
    
   
    return(
        <div>
           <Button 
		onClick={handleClick}
		style={styles.button}>Report</Button>
        <br/>
        <br/>
   
       
      </div>
    )
}

export default  HomePage;