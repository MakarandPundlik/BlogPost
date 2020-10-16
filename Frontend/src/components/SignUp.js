import React,{useState} from 'react';
import { makeStyles,createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {ThemeProvider, Typography, Link} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';

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
		height: 500,
		borderRadius:"8%"
	},
}));

const SignUp = (props) => {
    const classes = useStyles();
	const [state,setState]=useState({
		firstname:"",
		lastname:"",
		email:"",
		password:"",
		con_password:""
	});
	const handleChange=(e)=>{
		setState({
			...state,[e.target.id]:e.target.value
		})
		
	}
	const handleSubmit=(e)=>{
		const profile={}
		profile.firstname = state.firstname;
		profile.lastname = state.lastname;
		profile.email = state.email;
		profile.password = state.password;
		profile.con_password = state.con_password;
		
		
	}
    return ( 
        <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
	  <FormControl onSubmit={handleSubmit}>
      <Paper variant="outlined" className={classes.control}  elevation={15}>
	 
      <Typography variant="h4" gutterBottom>
		  Sign-Up
	  </Typography>
      <TextField id="firstname" label="First Name" variant="outlined" onChange={handleChange}/>
        <br/><br/>
        <TextField id="lastname" label="Last Name" variant="outlined" onChange={handleChange}/>
        <br/><br/>
       <TextField id="email" label="Email" variant="outlined" type="email" onChange={handleChange}/>
		<br/><br/>
        <TextField id="password" label="Password" variant="outlined" type="password" onChange={handleChange}/>
		<br/><br/>
        <TextField id="con_password" label="Confirm-Password" variant="outlined" type="password" onChange={handleChange}/>
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
 
export default SignUp;