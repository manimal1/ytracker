import {
  GET_ALL_COMPANIES,
  LOAD_COMPANY,
  CLEAR_SELECTED_COMPANY,
  CLEAR_COMPANIES,
} from './actions';

const company = {
  companyname: '',
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
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case GET_ALL_COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    case LOAD_COMPANY:
      return {
        ...state,
        selectedCompany: payload,
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
      }
    default:
      return state;
  }
}

export default reducer;
