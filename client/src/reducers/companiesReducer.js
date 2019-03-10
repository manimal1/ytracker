import { companyConstants } from '../constants';
import { company } from 'utils/objectModels';

const initialState = {
  companies: [],
  selectedCompany: company,
  isLoading: false,
};

const companiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case companyConstants.GET_ALL_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case companyConstants.GET_ALL_COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: payload,
      };
    case companyConstants.GET_ALL_COMPANIES_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case companyConstants.LOAD_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case companyConstants.LOAD_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedCompany: payload,
      };
    case companyConstants.LOAD_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case companyConstants.CLEAR_SELECTED_COMPANY:
      return {
        ...state,
        selectedCompany: company,
      };
    case companyConstants.CLEAR_COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    default:
      return state;
  }
};

export default companiesReducer;
