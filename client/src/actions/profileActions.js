import axios from 'axios';
import { profileConstants } from '../constants';

export const setProfileLoading = () => ({
  type: profileConstants.PROFILE_LOADING,
});

// GET current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: profileConstants.GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: profileConstants.GET_PROFILE,
        payload: err,
      }),
    );
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: profileConstants.CLEAR_CURRENT_PROFILE,
    payload: {},
  };
};

// create new profile
export const createUserProfile = () => {
  return {
    type: profileConstants.CREATE_USER_PROFILE,
  };
};
