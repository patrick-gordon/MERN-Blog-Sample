import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Post from './components/Post'


import AppNav from './components/AppNav';


function App() {
  return (
    <div className="App">
      <AppNav />
      <Switch>
        {/* <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} /> */}
        <Route path='/posts' component={Post} />
        {/* <Route path='/user' component={Profile} /> */}
      </Switch>
    </div>
  );
}

export default App;
