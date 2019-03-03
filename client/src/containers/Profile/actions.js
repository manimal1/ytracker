import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE';

export const setProfileLoading = () => ({ type: PROFILE_LOADING });

// GET current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: err,
      }),
    );
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
    payload: {},
  };
};

// create new profile
export const createUserProfile = () => {
  return {
    type: CREATE_USER_PROFILE,
  };
};
