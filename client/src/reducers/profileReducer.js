import { profileConstants } from '../constants';

const initialState = {
  profile: null,
  selectedProfile: null,
  isLoading: false,
  isCreated: false,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case profileConstants.GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isCreated: false,
      };
    case profileConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case profileConstants.GET_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case profileConstants.GET_SELECTED_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case profileConstants.GET_SELECTED_PROFILE_SUCCESS:
      return {
        ...state,
        selectedProfile: payload,
        isLoading: false,
      };
    case profileConstants.GET_SELECTED_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case profileConstants.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        isLoading: false,
        isCreated: false,
      };
    case profileConstants.CLEAR_SELECTED_PROFILE:
      return {
        ...state,
        selectedProfile: null,
        isLoading: false,
        isCreated: false,
      };
    case profileConstants.CREATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case profileConstants.CREATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isLoading: false,
        isCreated: true,
      };
    case profileConstants.CREATE_USER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        isCreated: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
