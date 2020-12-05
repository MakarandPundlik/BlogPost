
import React, { useEffect,  useRef,  useState } from 'react';
import { makeStyles,createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import {Typography} from "@material-ui/core";
import { Route,Redirect } from 'react-router';
import axios from 'axios';
import Loading from './loding';

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
	const classes = useStyles();
	const [err,setErr]=useState("");
	const[loading,setLoading]=useState(true);
	const handleAuth = async() =>{
		
			 await axios.get(`${API_URL}api/authenticate`,{
				headers:{
					"content-type":"application/json",
					"x-access-token":""
				}
			})
			.then((res)=>{
				if(res)
				setLoading(false);
				localStorage.setItem("isLoggedIn",true);
			})
			.catch(err=>{
				alert(err);
				localStorage.setItem("isLoggedIn",true);
				props.history.push("/");
			})
		
		
	}
	
	let totalUsers=[];
	
    const handleLogout = () =>{
		localStorage.removeItem("username");
		axios.get(`${API_URL}api/logout`,{
			headers:{
				Accpet:"application/json",
				"Content-Type":"application/json"
			}
		})
		.then((res)=>{
			props.history.push("/login");
		})
        .catch(err=>{
			console.log(err);
		})
	}
	useEffect(()=>{
		
		setErr(handleAuth());
		
	},[]);
	
	
	

    
    return(
		
		<>
		{loading===false?(<div className={classes.root}>
		<MuiThemeProvider theme={theme}>
		<FormControl onSubmit={handleLogout}>
		<Paper variant="outlined" className={classes.control}  elevation={15}>
		<Typography variant="h4" gutterBottom>
		   Welcome {localStorage.getItem("username")}
		</Typography>
		
			<Button 
		  onClick={handleLogout}
		  style={styles.button}>Logout</Button>
		</Paper>
		</FormControl>
	
	   </MuiThemeProvider>
		 <br/>
		 <br/>
		
        
      
        
        
	  </div>
		
	):(<Loading/>)
	}
	</>
	)
}

export default DashBoard;