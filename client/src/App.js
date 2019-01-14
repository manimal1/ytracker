import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';

import { default as PrivateRoute } from './components/PrivateRoute';
import {
  NavBar,
  Landing,
  Dashboard,
  Yachts,
  Company,
  Crew,
  Users,
  RegisterUser,
  LoginUser,
  Profile,
} from "./containers";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        <CssBaseline />
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Route exact path="/register" component = {RegisterUser} />
            <Route exact path="/login" component = {LoginUser} />
            <Switch>
              <PrivateRoute exact path="/yachts" component={Yachts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/company" component={Company} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/crew" component={Crew} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/users" component={Users} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

function mapStateToProps({  }) {
  return {};
}

export default connect(
  mapStateToProps,
)(App);
