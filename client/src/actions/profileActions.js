import axios from 'axios';
import { profileConstants, errorConstants } from '../constants';

// get all profiles
export const getAllProfiles = () => dispatch => {
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({ type: profileConstants.GET_ALL_PROFILES_REQUEST });
      dispatch({
        type: profileConstants.GET_ALL_PROFILES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: profileConstants.GET_ALL_PROFILES_REQUEST });
      dispatch({
        type: profileConstants.GET_ALL_PROFILES_FAIL,
        payload: err.data,
      });
    });
};

// GET profile by ID
export const getProfileById = profileId => dispatch => {
  axios
    .get(`/api/profile/${profileId}`)
    .then(res => {
      dispatch({ type: profileConstants.GET_SELECTED_PROFILE_REQUEST });
      dispatch({
        type: profileConstants.GET_SELECTED_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: profileConstants.GET_SELECTED_PROFILE_REQUEST });
      dispatch({
        type: profileConstants.GET_SELECTED_PROFILE_FAIL,
        payload: err.data,
      });
    });
};

// GET current profile
export const getCurrentProfile = () => dispatch => {
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({ type: profileConstants.GET_PROFILE_REQUEST });
      dispatch({
        type: profileConstants.GET_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: profileConstants.GET_PROFILE_REQUEST });
      dispatch({
        type: profileConstants.GET_PROFILE_FAIL,
        payload: err,
      });
    });
};

// clear current profile
export const clearSelectedProfile = () => {
  return {
    type: profileConstants.CLEAR_SELECTED_PROFILE,
    payload: {},
  };
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: profileConstants.CLEAR_CURRENT_PROFILE,
    payload: {},
  };
};

// create new profile
export const createUserProfile = userProfile => dispatch => {
  axios
    .post('/api/profile', userProfile)
    .then(res => {
      dispatch({ type: profileConstants.CREATE_USER_PROFILE_REQUEST });
      dispatch({
        type: profileConstants.CREATE_USER_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: profileConstants.CREATE_USER_PROFILE_REQUEST });
      dispatch({ type: profileConstants.CREATE_USER_PROFILE_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

// update profile
export const updateUserProfile = () => {
  return {
    type: profileConstants.UPDATE_USER_PROFILE,
  };
};
