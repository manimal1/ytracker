import axios from 'axios';
import { todoConstants, errorConstants } from '../constants';

export const getAllTodos = () => dispatch => {
  axios
    .get(`api/todos`)
    .then(res => {
      dispatch({ type: todoConstants.GET_ALL_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_ALL_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_TODOS_FAIL,
        payload: err.response.data,
      });
    });
};

export const getAllActiveTodos = () => dispatch => {
  axios
    .get(`api/todos/active`)
    .then(res => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_TODOS_FAIL,
        payload: err.response.data,
      });
    });
};

export const getTodoById = todoId => dispatch => {
  axios
    .get(`api/todos/${todoId}`)
    .then(res => {
      dispatch({ type: todoConstants.GET_TODO_REQUEST });
      dispatch({
        type: todoConstants.GET_TODO_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_TODO_REQUEST });
      dispatch({
        type: todoConstants.GET_TODO_FAIL,
        payload: err.response.data,
      });
    });
};

export const getAllUserTodos = userId => dispatch => {
  axios
    .get(`api/todos/user/${userId}`)
    .then(res => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_FAIL,
        payload: err.response.data,
      });
    });
};

export const getAllActiveUserTodos = userId => dispatch => {
  axios
    .get(`api/todos/user/active/${userId}`)
    .then(res => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_USER_TODOS_FAIL,
        payload: err.response.data,
      });
    });
};

export const getAllYachtTodos = yachtId => dispatch => {
  axios
    .get(`api/todos/yacht/${yachtId}`)
    .then(res => {
      dispatch({ type: todoConstants.GET_ALL_YACHT_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_YACHT_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_ALL_YACHT_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_YACHT_TODOS_FAIL,
        payload: err.response.data,
      });
    });
};

export const getAllActiveYachtTodos = yachtId => dispatch => {
  axios
    .get(`api/todos/yacht/active/${yachtId}`)
    .then(res => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_REQUEST });
      dispatch({
        type: todoConstants.GET_ALL_ACTIVE_YACHT_TODOS_FAIL,
        payload: err.response.data,
      });
    });
};

export const createTodo = (profileId, yachtId, todo) => dispatch => {
  axios
    .post(`api/todos/user/${profileId}/${yachtId}`, todo)
    .then(res => {
      dispatch({ type: todoConstants.CREATE_TODO_REQUEST });
      dispatch({
        type: todoConstants.CREATE_TODO_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: todoConstants.CREATE_TODO_REQUEST });
      dispatch({ type: todoConstants.CREATE_TODO_FAIL });
      dispatch({
        type: errorConstants.GET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

export const deleteTodo = todoId => dispatch => {
  axios
    .delete(`api/todos/${todoId}`)
    .then(() => {
      dispatch({ type: todoConstants.DELETE_TODO_REQUEST });
      dispatch({ type: todoConstants.DELETE_TODO_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: todoConstants.DELETE_TODO_REQUEST });
      dispatch({ type: todoConstants.DELETE_TODO_FAIL });
    });
};

export const clearSelectedTodo = () => dispatch => {
  dispatch({ type: todoConstants.CLEAR_SELECTED_TODO });
};
