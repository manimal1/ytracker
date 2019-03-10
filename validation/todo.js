const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTodo(data) {
  const errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.assignee = !isEmpty(data.assignee) ? data.assignee : '';

  if (!validator.isLength(data.assignee, { min: 10, max: 5000 })) {
    errors.assignee = 'Post must be between 10 and 5000 characters';
  }

  if (validator.isEmpty(data.assignee)) {
    errors.assignee = 'Assignee field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
