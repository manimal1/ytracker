import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const REGISTERING_YACHT = 'REGISTERING_YACHT';
export const REGISTER_YACHT_SUCCESS = 'REGISTER_YACHT_SUCCESS';
export const REGISTER_YACHT_FAIL = 'REGISTER_YACHT_FAIL';
export const CLEAR_YACHT_REGISTRATION = 'CLEAR_YACHT_REGISTRATION';
export const UPDATE_YACHT_SUCCESS = 'UPDATE_YACHT_SUCCESS';
export const UPDATE_YACHT_FAIL = 'UPDATE_YACHT_FAIL';
export const GET_ALL_YACHTS = 'GET_ALL_YACHTS';
export const LOAD_YACHT = 'LOAD_YACHT';

export const registerYacht = (yachtData) => dispatch => {
  axios
    .post('/api/yachts/register', yachtData)
    .then(res => {
      dispatch({ type: REGISTERING_YACHT });
      dispatch({
        type: REGISTER_YACHT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: REGISTERING_YACHT });
      dispatch({ type: REGISTER_YACHT_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
}

export const updateYacht = (id, yachtData) => dispatch => {
  axios
    .post(`/api/yachts/${id}`, yachtData)
    .then(res => {
      dispatch({ type: REGISTERING_YACHT });
      dispatch({
        type: UPDATE_YACHT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: REGISTERING_YACHT });
      dispatch({ type: UPDATE_YACHT_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      })
    });
}

export const clearYachtRegistrationData = () => dispatch => {
  dispatch({ type: CLEAR_YACHT_REGISTRATION });
}
