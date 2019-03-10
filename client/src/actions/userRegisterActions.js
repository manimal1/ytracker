import axios from 'axios';
import { errorConstants, userConstants } from '../constants';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      dispatch({
        type: userConstants.REGISTER_SUCCESS,
        payload: res.data,
      });
      history.push('/login');
    })
    .catch(err =>
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      }),
    );
};
