import axios from 'axios';
import { errorConstants } from '../../constants';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      history.push('/login');
    })
    .catch(err => dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      })
    );
}