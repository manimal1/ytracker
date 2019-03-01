import { errorConstants } from '../constants';

const initialState = {};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case errorConstants.GET_ERRORS:
      return payload;
    case errorConstants.CLEAR_ERRORS:
      return {}
    default:
      return state;
  }
}

export default reducer;
