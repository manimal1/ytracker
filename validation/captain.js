const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'First name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = 'Name field is required';
  }

  if (!validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Last name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = 'Last name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
