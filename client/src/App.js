import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Post from './components/Post'
import { loadUser } from './actions/authActions'
import store from './store';
import Signup from './components/Auth/Signup'


import AppNav from './components/AppNav';


class App extends Component {
 componentDidMount(){
   store.dispatch(loadUser());
 }

  render(){
  return (
    <div className="App">
      <AppNav />
      <Switch>
        {/* <Route path='/login' component={Login} /> */}
        <Route path='/signup' component={Signup} /> 
        <Route path='/posts' component={Post} />
        {/* <Route path='/user' component={Profile} /> */}
      </Switch>
    </div>
  );
}
}


export default App;
