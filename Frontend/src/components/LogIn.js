import React,{useState} from 'react';
import { makeStyles,createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {ThemeProvider, Typography} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
const API_URL = "http://localhost:2000/"

const styles = {
	button: {
		margin: 15,
		color: '#67B92A',
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
        background: '#67B92A',
		color: '#ffffff	',
		height: 300,
		borderRadius:"8%"
	},
}));

const LogIn = (props) => {


    const classes = useStyles();
	const [state, setState] = useState({
		email:" ",
		password:" "
	});
	

	const handleChange = (e) =>{
		setState({
			...state,[e.target.id]:e.target.value
		});
		
	}
	const handleSubmit=(e)=>{
		e.preventDefault();
		let profile={}
		profile.email = state.email;
		profile.password = state.password;
		
		axios.post(`http://localhost:2000/login/profile`,profile,{
			headers:{
				'Content-Type':'application/json'
			}
			
		})
		.then((res)=>{
			console.log(res)
			
			props.history.push('/dashboard')
		})
		.catch(err=>console.log(err));
	}
		
		
    return ( 
        <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
	  <FormControl onSubmit={handleSubmit}>
      <Paper variant="outlined" className={classes.control}  elevation={15}>
      <Typography variant="h4" gutterBottom>
		  Log-In
	  </Typography>
      
       <TextField id="email" label="Email" variant="outlined" type="email"
		   onChange={handleChange}
		   required={true}
	   />
		<br/><br/>
        <TextField id="password" label="Password" variant="outlined" type="password"
			 onChange={handleChange}
			 required={true}
		/>
		<br/><br/>
        
		<Button 
		onClick={handleSubmit}
		style={styles.button}>Submit</Button>
      </Paper>
	  </FormControl>
     </MuiThemeProvider>
      
    </div>
     );
}
 
export default LogIn;