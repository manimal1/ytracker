import {
  GET_ALL_COMPANIES_REQUEST,
  GET_ALL_COMPANIES_SUCCESS,
  GET_ALL_COMPANIES_FAIL,
  LOAD_COMPANY_REQUEST,
  LOAD_COMPANY_SUCCESS,
  LOAD_COMPANY_FAIL,
  CLEAR_SELECTED_COMPANY,
  CLEAR_COMPANIES,
} from './actions';

const company = {
  name: '',
  servicetype: '',
  email: '',
  phone: '',
  mobile: '',
  address: {
    addressline1: '',
    addressline2: '',
    city: '',
    postalcode: '',
    country: '',
  },
};

const initialState = {
  companies: [],
  selectedCompany: company,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: payload,
      };
    case GET_ALL_COMPANIES_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOAD_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedCompany: payload,
      };
    case LOAD_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case CLEAR_SELECTED_COMPANY:
      return {
        ...state,
        selectedCompany: company,
      };
    case CLEAR_COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    default:
      return state;
  }
};

export default reducer;
