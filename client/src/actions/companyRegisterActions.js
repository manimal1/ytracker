import axios from 'axios';
import { errorConstants, companyConstants } from '../constants';

export const registerCompany = company => dispatch => {
  axios
    .post('/api/company/register', company)
    .then(res => {
      dispatch({ type: companyConstants.REGISTERING_COMPANY });
      dispatch({
        type: companyConstants.REGISTER_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: companyConstants.REGISTERING_COMPANY });
      dispatch({ type: companyConstants.REGISTER_COMPANY_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

export const updateCompany = (id, companyData) => dispatch => {
  axios
    .post(`/api/company/${id}`, companyData)
    .then(res => {
      dispatch({ type: companyConstants.REGISTERING_COMPANY });
      dispatch({
        type: companyConstants.UPDATE_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: companyConstants.REGISTERING_COMPANY });
      dispatch({ type: companyConstants.UPDATE_COMPANY_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearCompanyRegistrationData = () => dispatch => {
  dispatch({ type: companyConstants.CLEAR_COMPANY_REGISTRATION });
};
