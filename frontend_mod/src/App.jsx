import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { NavLink, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';

import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
