import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import LogIn from './components/LogIn';
import './App.css';
import HomePage from './components/HomePage';
import DashBoard from './components/DashBoard';




function App() {

  const styles = {
    error:{
      color:'#F90000'
    }
  };

  
  return (
    <div className="App">
    <NavBar/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/signup" component={SignUp}/>
        
        <Route  path='/dashboard' component={DashBoard} />
        <Route path="*">
          <h1 style={styles.error}>Error 404 Not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
