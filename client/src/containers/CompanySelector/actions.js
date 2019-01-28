import axios from 'axios';
import { errorConstants } from '../../constants';

export const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES';
export const LOAD_COMPANY = 'LOAD_COMPANY';
export const CLEAR_SELECTED_COMPANY = 'CLEAR_SELECTED_COMPANY';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';

export const getAllCompanies = () => dispatch => {
  axios
    .get('/api/company')
    .then(res => {
      dispatch({
        type: GET_ALL_COMPANIES,
        payload: res.data,
      });
    })
    .catch(err => {
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
      dispatch({
        type: LOAD_COMPANY,
        payload: res.data,
      });
    })
    .catch(err => {
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
