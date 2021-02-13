import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {NavLink,BrowserRouter,Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/login" component={Login}></Route> 
          <Route exact path="/signup" component={Signup}></Route> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
