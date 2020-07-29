import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TestHome from './components/pages/TestHome';
import CreateProfile from './components/pages/CreateProfile';
import EditProfile from './components/pages/EditProfile';
import MyProfile from './components/pages/MyProfile';
import Connect from './components/pages/Connect';
import Profile from './components/pages/Profile';
import Feed from './components/pages/Feed';
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
// CSS
import "materialize-css/dist/css/materialize.min.css";
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Switch>
            <Route exact path = "/" component={TestHome}/>
            <Route exact path = "/register" component={Register}/>
            <Route exact path = "/login" component={Login}/>
            <Route exact path = "/testhome" component={TestHome}/>
            <Route exact path = "/createprofile" component={CreateProfile}/>
            <Route exact path = "/editprofile" component={EditProfile}/>
            <Route exact path = "/myprofile" component={MyProfile}/>
            <Route exact path="/profile/:id" component={Profile}/>
            <Route exact path = "/connect" component={Connect}/>
            <Route exact path = "/profile/:username" component={Profile}/>
            <Route exact path = "/feed" component={Feed}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
