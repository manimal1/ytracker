import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { MuiThemeProvider } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode'; // eslint-disable-line camelcase
import theme from './theme';
import setAuthToken from './utils/setAuthToken';
import { selectedYacht } from './utils/objectModels';
import { setCurrentUser, logoutUser } from './containers/LoginUser/actions';

import App from './App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

const initialState = {
  yachtData: {
    yachts: [],
    selectedYacht,
  },
};

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middlewares = [reduxThunk, logger];

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

// check for token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  // set auth token header auth
  setAuthToken(token);
  // Decode token and get user info
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // TODO: clear current profile

    // redirect to login
    window.location.href = '/';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
