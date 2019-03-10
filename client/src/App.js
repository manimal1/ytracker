import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrivateRoute from './components/PrivateRoute';
import {
  Landing,
  Dashboard,
  Yachts,
  Users,
  Company,
  Crew,
  RegisterUser,
  LoginUser,
  Profile,
} from './containers';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/login" component={LoginUser} />
            <Switch>
              <PrivateRoute exact path="/yachts" component={Yachts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/users" component={Users} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/company" component={Company} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/crew" component={Crew} />
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

export default App;
