import axios from 'axios';
import { errorConstants } from '../../../../constants';

export const REGISTERING_COMPANY = 'REGISTERING_COMPANY';
export const REGISTER_COMPANY_SUCCESS = 'REGISTER_COMPANY_SUCCESS';
export const REGISTER_COMPANY_FAIL = 'REGISTER_COMPANY_FAIL';
export const CLEAR_COMPANY_REGISTRATION = 'CLEAR_COMPANY_REGISTRATION';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAIL = 'UPDATE_COMPANY_FAIL';

export const registerCompany = (company) => dispatch => {
  axios
    .post('/api/company/register', company)
    .then(res => {
      dispatch({ type: REGISTERING_COMPANY });
      dispatch({
        type: REGISTER_COMPANY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: REGISTERING_COMPANY });
      dispatch({ type: REGISTER_COMPANY_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
}

export const updateCompany = (id, companyData) => dispatch => {
  axios
    .post(`/api/company/${id}`, companyData)
    .then(res => {
      dispatch({ type: REGISTERING_COMPANY });
      dispatch({
        type: UPDATE_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: REGISTERING_COMPANY });
      dispatch({ type: UPDATE_COMPANY_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      })
    });
}

export const clearCompanyRegistrationData = () => dispatch => {
  dispatch({ type: CLEAR_COMPANY_REGISTRATION });
}
