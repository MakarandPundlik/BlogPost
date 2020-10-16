
import React from 'react';
import { makeStyles,createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import {ThemeProvider, Typography} from "@material-ui/core";


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
		height: 100,
	},
}));



const DashBoard = (props) =>{
    const classes = useStyles();
    const handleLogout = () =>{
        props.history.push('/login');
    }
    return(
        <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
        <FormControl onSubmit={handleLogout}>
        <Paper variant="outlined" className={classes.control}  elevation={15}>
        <Typography variant="h4" gutterBottom>
           Welcome !
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