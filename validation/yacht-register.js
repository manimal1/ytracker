const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateYachtRegisterInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.yachttype = !isEmpty(data.yachttype) ? data.yachttype : '';

  if (!validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = 'Name must be between 1 and 30 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (validator.isEmpty(data.yachttype)) {
    errors.yachttype = 'Yacht type field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
