const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  const errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.role = !isEmpty(data.role) ? data.role : '';

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = 'First name field is required';
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = 'First name field is required';
  }

  if (validator.isEmpty(data.role)) {
    errors.role = 'Profile role field is required';
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid url';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
