import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const REGISTER_YACHT_SUCCESS = 'REGISTER_YACHT_SUCCESS';
export const UPDATE_YACHT_SUCCESS = 'UPDATE_YACHT_SUCCESS';
export const GET_ALL_YACHTS = 'GET_ALL_YACHTS';
export const LOAD_YACHT = 'LOAD_YACHT';

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

export const updateYacht = (id, yachtData) => dispatch => {
  axios
    .post(`/api/yachts/${id}`, yachtData)
    .then(res => {
      dispatch({
        type: UPDATE_YACHT_SUCCESS,
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
