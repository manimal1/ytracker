import { serviceConstants } from '../constants';

const initialState = {
  yachtService: {},
};

const yachtServiceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case serviceConstants.ADD_YACHT_SERVICE:
      return {
        ...state,
        isAddingService: true,
      };
    case serviceConstants.ADD_YACHT_SERVICE_SUCCESS:
      return {
        ...state,
        newService: payload,
        isAddingService: false,
        isServiceAdded: true,
      };
    case serviceConstants.ADD_YACHT_SERVICE_FAIL:
      return {
        ...state,
        isAddingService: false,
        isServiceAdded: false,
      };
    case serviceConstants.CLEAR_YACHT_SERVICE:
      return {
        ...state,
        isAddingService: false,
        isServiceAdded: false,
        newService: {},
      };
    default:
      return state;
  }
};

export default yachtServiceReducer;
