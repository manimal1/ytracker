import { companyConstants } from '../constants';

const initialState = {
  newCompany: {},
  isRegistered: false,
  isUpdated: false,
  isFetching: false,
};

const companyRegisterReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case companyConstants.REGISTERING_COMPANY:
      return {
        ...state,
        isFetching: true,
      };
    case companyConstants.REGISTER_COMPANY_SUCCESS:
      return {
        ...state,
        newCompany: payload,
        isFetching: false,
        isRegistered: true,
      };
    case companyConstants.REGISTER_COMPANY_FAIL:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
      };
    case companyConstants.CLEAR_COMPANY_REGISTRATION:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
        newCompany: {},
      };
    case companyConstants.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        newCompany: payload,
        isFetching: false,
        isUpdated: true,
      };
    case companyConstants.UPDATE_COMPANY_FAIL:
      return {
        ...state,
        isFetching: false,
        isUpdated: false,
      };
    default:
      return state;
  }
};

export default companyRegisterReducer;
