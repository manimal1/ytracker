import { SET_CURRENT_USER } from './actions';
import isEmpty from '../../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      };
    default:
      return state;
  }
};

export default reducer;
