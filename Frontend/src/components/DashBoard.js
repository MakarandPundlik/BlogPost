
import React, { useEffect,  useState } from 'react';
import { makeStyles,createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import {Typography} from "@material-ui/core";
import { Route,Redirect } from 'react-router';
import axios from 'axios';


const API_URL = "http://localhost:2000/";

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

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#EDF5E1'
		},
		secondary: {
			main: '#EDF5E1'
		},
	}
})

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',

	},

	control: {
		padding: theme.spacing(2),
		width: theme.spacing(50),
		height: theme.spacing(50),
		marginTop: theme.spacing(5),
		background: '#AC3B61',
		color: '#ffffff	',
		height: 100,
		borderRadius:"8%"
	},
}));



const DashBoard = (props) =>{
	const [auth,setAuth] = useState(false);
    const classes = useStyles();
    const handleLogout = () =>{
		localStorage.removeItem('token');
        props.history.push('/login');
	}
	
	const getAuth = async()=>{
		const isAuthentication = await  axios.get(`${API_URL}verifytoken`,{
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json",
				"token":localStorage.getItem("token")
			}
		})
		.then((res)=>{
			alert(res.data.msg);
			if(res.data.user)
			setAuth(true);
		})
		.catch((err)=>console.log(err));
	}
	useEffect(()=>{
		getAuth();
		
	},[ ])
	
	
	
	if(!localStorage.getItem("token") || !auth)
	return (<Redirect to="/login"/>)
    return(
		
		<div className={classes.root}>
		<MuiThemeProvider theme={theme}>
		<FormControl onSubmit={handleLogout}>
		<Paper variant="outlined" className={classes.control}  elevation={15}>
		<Typography variant="h4" gutterBottom>
		   Welcome 
		</Typography>
		
			<Button 
		  onClick={handleLogout}
		  style={styles.button}>Logout</Button>
		</Paper>
		</FormControl>
	
	   </MuiThemeProvider>
		 
	  </div>
		
	)
	
}

export default DashBoard;