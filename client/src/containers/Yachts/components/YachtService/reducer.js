import {
  ADD_YACHT_SERVICE,
  ADD_YACHT_SERVICE_SUCCESS,
  ADD_YACHT_SERVICE_FAIL,
  CLEAR_YACHT_SERVICE,
} from './actions';

const initialState = {
  yachtService: {}
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ADD_YACHT_SERVICE:
      return {
        ...state,
        isAddingService: true,
      }
    case ADD_YACHT_SERVICE_SUCCESS:
      return {
        ...state,
        newService: payload,
        isAddingService: false,
        isServiceAdded: true,
      };
    case ADD_YACHT_SERVICE_FAIL:
      return {
        ...state,
        isAddingService: false,
        isServiceAdded: false,
      };
    case CLEAR_YACHT_SERVICE:
      return {
        ...state,
        isAddingService: false,
        isServiceAdded: false,
        newService: {},
      }
    default:
      return state;
  }
}

export default reducer;
