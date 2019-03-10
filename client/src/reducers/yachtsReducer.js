import { yachtConstants } from '../constants';

import { selectedYacht } from 'utils/objectModels';

const initialState = {
  yachts: [],
  activeYachts: [],
  selectedYacht,
  isLoading: false,
};

const yachtsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case yachtConstants.GET_ALL_YACHTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case yachtConstants.GET_ALL_YACHTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        yachts: payload,
      };
    case yachtConstants.GET_ALL_YACHTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case yachtConstants.GET_ALL_ACTIVE_YACHTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case yachtConstants.GET_ALL_ACTIVE_YACHTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activeYachts: payload,
      };
    case yachtConstants.GET_ALL_ACTIVE_YACHTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case yachtConstants.LOAD_YACHT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case yachtConstants.LOAD_YACHT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedYacht: payload,
      };
    case yachtConstants.LOAD_YACHT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case yachtConstants.CLEAR_SELECTED_YACHT:
      return {
        ...state,
        selectedYacht,
      };
    case yachtConstants.CLEAR_YACHTS:
      return {
        ...state,
        yachts: payload,
      };
    default:
      return state;
  }
};

export default yachtsReducer;
