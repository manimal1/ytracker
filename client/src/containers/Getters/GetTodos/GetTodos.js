import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ItemSelector from 'components/ItemSelector';

import {
  getTodoById,
  getAllTodos,
  getAllActiveTodos,
  getAllUserTodos,
  getAllActiveUserTodos,
  getAllYachtTodos,
  getAllActiveYachtTodos,
  clearSelectedTodo,
} from 'actions/todoActions';

class GetTodos extends Component {
  componentDidMount() {
    this.props.getAllActiveUserTodos();
  }

  render() {
    const {
      allTodos,
      allActiveTodos,
      allUserTodos,
      allActiveUserTodos,
      allYachtTodos,
      allActiveYachtTodos,
      selectedTodo,
      newTodo,
      isAddingTodo,
      isNewTodoAdded,
      isLoading,
      isTodoDeleted,
    } = this.props;

    return (
      <div>
        <br />
        <br />
        This will be the main todos page!
      </div>
    );
  }
}

GetTodos.propTypes = {
  getTodoById: PropTypes.func.isRequired,
  getAllTodos: PropTypes.func.isRequired,
  getAllActiveTodos: PropTypes.func.isRequired,
  getAllUserTodos: PropTypes.func.isRequired,
  getAllActiveUserTodos: PropTypes.func.isRequired,
  getAllYachtTodos: PropTypes.func.isRequired,
  getAllActiveYachtTodos: PropTypes.func.isRequired,
  clearSelectedTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  todos: state.todos,
});

export default compose(
  connect(
    mapStateToProps,
    {
      getTodoById,
      getAllTodos,
      getAllActiveTodos,
      getAllUserTodos,
      getAllActiveUserTodos,
      getAllYachtTodos,
      getAllActiveYachtTodos,
      clearSelectedTodo,
    },
  ),
)(GetTodos);
