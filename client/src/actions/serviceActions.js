import axios from 'axios';
import { errorConstants, serviceConstants } from '../constants';

export const addYachtService = (yachtId, companyId, service) => dispatch => {
  axios
    .post(`/api/yachts/services/${yachtId}&${companyId}`, service)
    .then(res => {
      dispatch({ type: serviceConstants.ADD_YACHT_SERVICE });
      dispatch({
        type: serviceConstants.ADD_YACHT_SERVICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: serviceConstants.ADD_YACHT_SERVICE });
      dispatch({ type: serviceConstants.ADD_YACHT_SERVICE_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

export const clearYachtServiceData = () => dispatch => {
  dispatch({ type: serviceConstants.CLEAR_YACHT_SERVICE });
};
