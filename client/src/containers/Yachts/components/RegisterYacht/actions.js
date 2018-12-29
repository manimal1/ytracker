import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const REGISTER_YACHT_SUCCESS = 'REGISTER_YACHT_SUCCESS';

export const registerYacht = (yachtData) => dispatch => {
  axios
    .post('/api/yachts/register', yachtData)
    .then(res => {
      dispatch({
        type: REGISTER_YACHT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      })
    });
}