import { todoConstants } from '../constants';

const initialState = {
  allTodos: [],
  allActiveTodos: [],
  allUserTodos: [],
  allActiveUserTodos: [],
  allYachtTodos: [],
  allActiveYachtTodos: [],
  selectedTodo: {},
  newTodo: {},
  isAddingTodo: false,
  isNewTodoAdded: false,
  isLoading: false,
  isTodoDeleted: false,
};

const todosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case todoConstants.CREATE_TODO_REQUEST:
      return {
        ...state,
        isAddingTodo: true,
      };
    case todoConstants.CREATE_TODO_SUCCESS:
      return {
        ...state,
        newService: payload,
        isAddingTodo: false,
        isNewTodoAdded: true,
      };
    case todoConstants.CREATE_TODO_FAIL:
      return {
        ...state,
        isAddingTodo: false,
        isNewTodoAdded: false,
      };
    case todoConstants.GET_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_TODO_SUCCESS:
      return {
        ...state,
        selectedTodo: payload,
        isLoading: false,
      };
    case todoConstants.GET_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.GET_ALL_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_ALL_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allTodos: payload,
      };
    case todoConstants.GET_ALL_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.GET_ALL_ACTIVE_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_ALL_ACTIVE_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allActiveTodos: payload,
      };
    case todoConstants.GET_ALL_ACTIVE_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.GET_ALL_USER_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_ALL_USER_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUserTodos: payload,
      };
    case todoConstants.GET_ALL_USER_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.GET_ALL_ACTIVE_USER_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_ALL_ACTIVE_USER_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allActiveUserTodos: payload,
      };
    case todoConstants.GET_ALL_ACTIVE_USER_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.GET_ALL_YACHT_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_ALL_YACHT_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allYachtTodos: payload,
      };
    case todoConstants.GET_ALL_YACHT_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allActiveYachtTodos: payload,
      };
    case todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case todoConstants.DELETE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoConstants.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isTodoDeleted: true,
      };
    case todoConstants.DELETE_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        isTodoDeleted: false,
      };
    case todoConstants.CLEAR_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: {},
      };
    default:
      return state;
  }
};

export default todosReducer;
