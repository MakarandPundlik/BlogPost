import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';

const styles = {
	button: {
		margin: 15,
		color: '#39710F',
		background: '#ffffff',
    fontWeight: 'bold',
    
    },
    link:{
      textdecoration:'none'
    },
	floatingLabelFocusStyle: {
		color: "#F9A257"
	},
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft:"20%",
    color: '#39710F'
  },
  appbar:{
    background:'#DDF5D9'
  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
           User Registraion
          </Typography>
       <Link href="/login" > <Button style={styles.button}> Log In</Button></Link>
       <Link href="/signup" > <Button style={styles.button}> Sign Up</Button></Link>
       <Link href="/dashboard"> <Button style={styles.button}> DashBoard</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
