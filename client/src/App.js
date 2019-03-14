import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrivateRoute from './components/PrivateRoute';
import {
  Landing,
  Layout,
  Dashboard,
  RegisterUser,
  LoginUser,
} from './containers';
import { RegisterYacht, YachtService, YachtsHome } from './containers/Yachts';
import { UsersTodos, UsersProfile } from './containers/Users';
import { RegisterCompany } from './containers/Company';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/login" component={LoginUser} />
            <Layout>
              <Switch>
                <PrivateRoute exact path="/yachts" component={YachtsHome} />
                <PrivateRoute
                  exact
                  path="/yachts/add"
                  component={RegisterYacht}
                />
                <PrivateRoute
                  exact
                  path="/yachts/service"
                  component={YachtService}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/users" component={UsersTodos} />
                <PrivateRoute
                  exact
                  path="/users/profile"
                  component={UsersProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/company"
                  component={RegisterCompany}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </Layout>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
