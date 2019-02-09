import axios from 'axios';
import { errorConstants } from '../../constants';

export const GET_ALL_COMPANIES_REQUEST = 'GET_ALL_COMPANIES_REQUEST';
export const GET_ALL_COMPANIES_SUCCESS = 'GET_ALL_COMPANIES_SUCCESS';
export const GET_ALL_COMPANIES_FAIL = 'GET_ALL_COMPANIES_FAIL';
export const LOAD_COMPANY_REQUEST = 'LOAD_COMPANY_REQUEST';
export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const LOAD_COMPANY_FAIL = 'LOAD_COMPANY_FAIL';
export const CLEAR_SELECTED_COMPANY = 'CLEAR_SELECTED_COMPANY';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';

export const getAllCompanies = () => dispatch => {
  axios
    .get('/api/company')
    .then(res => {
      dispatch({ type: GET_ALL_COMPANIES_REQUEST });
      dispatch({
        type: GET_ALL_COMPANIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: GET_ALL_COMPANIES_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
}

export const getCompanyById = (id) => dispatch => {
  axios
    .get(`/api/company/${id}`)
    .then(res => {
      dispatch({ type: LOAD_COMPANY_REQUEST });
      dispatch({
        type: LOAD_COMPANY_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: LOAD_COMPANY_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
}

export const clearCompanies = () => dispatch => {
  dispatch({
    type: CLEAR_COMPANIES,
    payload: [],
  })
}

export const clearSelectedCompany = () => dispatch => {
  dispatch({
    type: CLEAR_SELECTED_COMPANY,
    payload: {},
  })
}
