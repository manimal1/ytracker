import axios from 'axios';
import { errorConstants } from '../../constants';

export const GET_ALL_YACHTS = 'GET_ALL_YACHTS';
export const LOAD_YACHT = 'LOAD_YACHT';
export const CLEAR_SELECTED_YACHT = 'CLEAR_SELECTED_YACHT';
export const CLEAR_YACHTS = 'CLEAR_YACHTS';

export const getAllYachts = () => dispatch => {
  axios
    .get('/api/yachts')
    .then(res => {
      dispatch({
        type: GET_ALL_YACHTS,
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

export const getYachtById = (id) => dispatch => {
  axios
    .get(`/api/yachts/${id}`)
    .then(res => {
      dispatch({
        type: LOAD_YACHT,
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
