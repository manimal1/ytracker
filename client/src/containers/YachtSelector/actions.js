import axios from 'axios';
import { errorConstants } from '../../constants';

export const GET_ALL_YACHTS_REQUEST = 'GET_ALL_YACHTS_REQUEST';
export const GET_ALL_YACHTS_SUCCESS = 'GET_ALL_YACHTS_SUCCESS';
export const GET_ALL_YACHTS_FAIL = 'GET_ALL_YACHTS_FAIL';
export const LOAD_YACHT_REQUEST = 'LOAD_YACHT_REQUEST';
export const LOAD_YACHT_SUCCESS = 'LOAD_YACHT_SUCCESS';
export const LOAD_YACHT_FAIL = 'LOAD_YACHT_FAIL';
export const CLEAR_SELECTED_YACHT = 'CLEAR_SELECTED_YACHT';
export const CLEAR_YACHTS = 'CLEAR_YACHTS';

export const getAllYachts = () => dispatch => {
  axios
    .get('/api/yachts')
    .then(res => {
      dispatch({ type: GET_ALL_YACHTS_REQUEST });
      dispatch({
        type: GET_ALL_YACHTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: GET_ALL_YACHTS_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
}

export const getYachtById = (id) => dispatch => {
  axios
    .get(`/api/yachts/${id}`)
    .then(res => {
      dispatch({ type: LOAD_YACHT_REQUEST });
      dispatch({
        type: LOAD_YACHT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: LOAD_YACHT_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
}

export const clearYachts = () => dispatch => {
  dispatch({
    type: CLEAR_YACHTS,
    payload: [],
  })
}

export const clearSelectedYacht = () => dispatch => {
  dispatch({
    type: CLEAR_SELECTED_YACHT,
    payload: {},
  })
}
