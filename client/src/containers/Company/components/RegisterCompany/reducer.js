import {
  REGISTERING_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAIL,
  CLEAR_COMPANY_REGISTRATION,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  GET_ALL_COMPANIES,
  LOAD_COMPANY,
} from './actions';

const initialState = {
    newCompany: {},
    isRegistered: false,
    isUpdated: false,
    isFetching: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {

    case REGISTERING_COMPANY:
      return {
        ...state,
        isFetching: true,
      }
    case REGISTER_COMPANY_SUCCESS:
      return {
        ...state,
        newCompany: payload,
        isFetching: false,
        isRegistered: true,
      };
    case REGISTER_COMPANY_FAIL:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
      };
    case CLEAR_COMPANY_REGISTRATION:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
        newCompany: {},
      }
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        newCompany: payload,
        isFetching: false,
        isUpdated: true,
      }
    case UPDATE_COMPANY_FAIL:
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
