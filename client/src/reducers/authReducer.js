import isEmpty from '../validation/is-empty';
import { userConstants } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userConstants.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
