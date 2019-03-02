import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const ADD_YACHT_SERVICE = 'ADD_YACHT_SERVICE';
export const ADD_YACHT_SERVICE_SUCCESS = 'ADD_YACHT_SERVICE_SUCCESS';
export const ADD_YACHT_SERVICE_FAIL = 'ADD_YACHT_SERVICE_FAIL';
export const CLEAR_YACHT_SERVICE = 'CLEAR_YACHT_SERVICE';

export const addYachtService = (yachtId, companyId, service) => dispatch => {
  axios
    .post(`/api/yachts/services/${yachtId}&${companyId}`, service)
    .then(res => {
      dispatch({ type: ADD_YACHT_SERVICE });
      dispatch({
        type: ADD_YACHT_SERVICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: ADD_YACHT_SERVICE });
      dispatch({ type: ADD_YACHT_SERVICE_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

export const clearYachtServiceData = () => dispatch => {
  dispatch({ type: CLEAR_YACHT_SERVICE });
};
