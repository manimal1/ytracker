import axios from 'axios';
import { errorConstants, companyConstants } from '../constants';

export const getAllCompanies = () => dispatch => {
  axios
    .get('/api/company')
    .then(res => {
      dispatch({ type: companyConstants.GET_ALL_COMPANIES_REQUEST });
      dispatch({
        type: companyConstants.GET_ALL_COMPANIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: companyConstants.GET_ALL_COMPANIES_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getCompanyById = id => dispatch => {
  axios
    .get(`/api/company/${id}`)
    .then(res => {
      dispatch({ type: companyConstants.LOAD_COMPANY_REQUEST });
      dispatch({
        type: companyConstants.LOAD_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: companyConstants.LOAD_COMPANY_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearCompanies = () => dispatch => {
  dispatch({
    type: companyConstants.CLEAR_COMPANIES,
    payload: [],
  });
};

export const clearSelectedCompany = () => dispatch => {
  dispatch({
    type: companyConstants.CLEAR_SELECTED_COMPANY,
    payload: {},
  });
};
