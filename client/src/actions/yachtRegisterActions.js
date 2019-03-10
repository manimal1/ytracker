import axios from 'axios';
import { errorConstants, yachtConstants } from '../constants';

export const registerYacht = yachtData => dispatch => {
  axios
    .post('/api/yachts/register', yachtData)
    .then(res => {
      dispatch({ type: yachtConstants.REGISTERING_YACHT });
      dispatch({
        type: yachtConstants.REGISTER_YACHT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: yachtConstants.REGISTERING_YACHT });
      dispatch({ type: yachtConstants.REGISTER_YACHT_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

export const updateYacht = (id, yachtData) => dispatch => {
  axios
    .post(`/api/yachts/${id}`, yachtData)
    .then(res => {
      dispatch({ type: yachtConstants.REGISTERING_YACHT });
      dispatch({
        type: yachtConstants.UPDATE_YACHT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: yachtConstants.REGISTERING_YACHT });
      dispatch({ type: yachtConstants.UPDATE_YACHT_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearYachtRegistrationData = () => dispatch => {
  dispatch({ type: yachtConstants.CLEAR_YACHT_REGISTRATION });
};
