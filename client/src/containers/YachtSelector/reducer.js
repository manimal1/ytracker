import {
  GET_ALL_YACHTS_REQUEST,
  GET_ALL_YACHTS_SUCCESS,
  GET_ALL_YACHTS_FAIL,
  LOAD_YACHT_REQUEST,
  LOAD_YACHT_SUCCESS,
  LOAD_YACHT_FAIL,
  CLEAR_SELECTED_YACHT,
  CLEAR_YACHTS,
} from './actions';

import { selectedYacht } from '../../utils/objectModels';

const initialState = {
  yachts: [],
  selectedYacht: selectedYacht,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case GET_ALL_YACHTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_YACHTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        yachts: payload,
      };
    case GET_ALL_YACHTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOAD_YACHT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_YACHT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedYacht: payload,
      };
    case LOAD_YACHT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case CLEAR_SELECTED_YACHT:
      return {
        ...state,
        selectedYacht: selectedYacht,
      };
    case CLEAR_YACHTS:
      return {
        ...state,
        yachts: payload,
      }
    default:
      return state;
  }
}

export default reducer;
