import axios from 'axios';
import jwt_decode from 'jwt-decode'; // eslint-disable-line camelcase
import setAuthToken from 'utils/setAuthToken';
import { errorConstants, userConstants } from '../constants';

export const setCurrentUser = decoded => {
  return {
    type: userConstants.SET_CURRENT_USER,
    payload: decoded,
  };
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      console.log({ res });
      // save to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      dispatch({ type: errorConstants.CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => dispatch => {
  // remove token from localstorage
  localStorage.removeItem('jwtToken');
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
