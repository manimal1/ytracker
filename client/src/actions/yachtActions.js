import axios from 'axios';
import { errorConstants, yachtConstants } from '../constants';

export const getAllYachts = () => dispatch => {
  axios
    .get('/api/yachts')
    .then(res => {
      dispatch({ type: yachtConstants.GET_ALL_YACHTS_REQUEST });
      dispatch({
        type: yachtConstants.GET_ALL_YACHTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: yachtConstants.GET_ALL_YACHTS_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getYachtById = id => dispatch => {
  axios
    .get(`/api/yachts/${id}`)
    .then(res => {
      dispatch({ type: yachtConstants.LOAD_YACHT_REQUEST });
      dispatch({
        type: yachtConstants.LOAD_YACHT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: yachtConstants.LOAD_YACHT_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAllActiveYachts = () => dispatch => {
  axios
    .get('/api/yachts/active')
    .then(res => {
      dispatch({ type: yachtConstants.GET_ALL_ACTIVE_YACHTS_REQUEST });
      dispatch({
        type: yachtConstants.GET_ALL_ACTIVE_YACHTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: yachtConstants.GET_ALL_ACTIVE_YACHTS_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearYachts = () => dispatch => {
  dispatch({
    type: yachtConstants.CLEAR_YACHTS,
    payload: [],
  });
};

export const clearSelectedYacht = () => dispatch => {
  dispatch({
    type: yachtConstants.CLEAR_SELECTED_YACHT,
    payload: {},
  });
};
