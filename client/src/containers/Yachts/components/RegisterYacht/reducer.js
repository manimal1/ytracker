import {
  REGISTERING_YACHT,
  REGISTER_YACHT_SUCCESS,
  REGISTER_YACHT_FAIL,
  CLEAR_YACHT_REGISTRATION,
  UPDATE_YACHT_SUCCESS,
  UPDATE_YACHT_FAIL,
} from './actions';

const initialState = {
    newYacht: {},
    isRegistered: false,
    isUpdated: false,
    isFetching: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {

    case REGISTERING_YACHT:
      return {
        ...state,
        isFetching: true,
      }
    case REGISTER_YACHT_SUCCESS:
      return {
        ...state,
        newYacht: payload,
        isFetching: false,
        isRegistered: true,
      };
    case REGISTER_YACHT_FAIL:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
      };
    case CLEAR_YACHT_REGISTRATION:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
        newYacht: {},
      }
    case UPDATE_YACHT_SUCCESS:
      return {
        ...state,
        newYacht: payload,
        isFetching: false,
        isUpdated: true,
      }
    case UPDATE_YACHT_FAIL:
      return {
        ...state,
        isFetching: false,
        isUpdated: false,
      }
    default:
      return state;
  }
}

export default reducer;
