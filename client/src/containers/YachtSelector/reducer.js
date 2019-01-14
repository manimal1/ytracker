import {
  GET_ALL_YACHTS,
  LOAD_YACHT,
  CLEAR_SELECTED_YACHT,
  CLEAR_YACHTS,
} from './actions';

import { selectedYacht } from '../../utils/setSelectedYacht';

const initialState = {
  yachts: [],
  selectedYacht: selectedYacht,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {

    case GET_ALL_YACHTS:
      return {
        ...state,
        yachts: payload,
      };
    case LOAD_YACHT:
      return {
        ...state,
        selectedYacht: payload,
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
