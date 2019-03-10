import { profileConstants } from '../constants';

const initialState = {
  profile: null,
  loading: false,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case profileConstants.PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case profileConstants.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case profileConstants.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
