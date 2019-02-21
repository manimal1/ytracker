const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateServiceInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.name = !isEmpty(data.name) ? data.name : '';

  if (!validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = 'Name must be between 1 and 30 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isEmpty(data.yachtId)) {
    errors.yacht = 'Yacht is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
