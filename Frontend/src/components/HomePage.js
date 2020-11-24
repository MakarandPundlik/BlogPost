import React from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';



const API_URL = "http://localhost:2020/";


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

const HomePage = () =>{
    let totalUsers = [];

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
                return (user.firstname)
            })
            console.log(totalUsers)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    
    return(
        <div>
        <Button 
		onClick={handleClick}
		style={styles.button}>Report</Button>
        <br/>
        <br/>
        
      
        <Chip
        icon={<FaceIcon />}
        label={"Hello"}
       // onDelete={handleDelete}
      
        color="secondary"
        variant="outlined"
      ></Chip>
        
      </div>
    )
}

export default  HomePage;