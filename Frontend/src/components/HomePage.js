import React from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios';
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

    const handleClick=(e)=>{
        e.preventDefault();
        axios.get(`${API_URL}`,{
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",

            }
        })
        .then((res)=>{
            console.log(res.data.users);
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
        </div>
    )
}

export default  HomePage;