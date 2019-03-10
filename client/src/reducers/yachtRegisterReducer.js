import { yachtConstants } from '../constants';

const initialState = {
  newYacht: {},
  isRegistered: false,
  isUpdated: false,
  isFetching: false,
};

const yachtRegisterReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case yachtConstants.REGISTERING_YACHT:
      return {
        ...state,
        isFetching: true,
      };
    case yachtConstants.REGISTER_YACHT_SUCCESS:
      return {
        ...state,
        newYacht: payload,
        isFetching: false,
        isRegistered: true,
      };
    case yachtConstants.REGISTER_YACHT_FAIL:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
      };
    case yachtConstants.CLEAR_YACHT_REGISTRATION:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
        newYacht: {},
      };
    case yachtConstants.UPDATE_YACHT_SUCCESS:
      return {
        ...state,
        newYacht: payload,
        isFetching: false,
        isUpdated: true,
      };
    case yachtConstants.UPDATE_YACHT_FAIL:
      return {
        ...state,
        isFetching: false,
        isUpdated: false,
      };
    default:
      return state;
  }
};

export default yachtRegisterReducer;
