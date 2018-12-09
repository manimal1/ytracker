const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateYachtProfileInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.lao = !isEmpty(data.lao) ? data.lao : '';

  if (!validator.isLength(data.loa, { min: 2, max: 40 })) {
    errors.loa = 'Length overall needs to be between 2 and 40 characters';
  }

  if (validator.isEmpty(data.loa)) {
    errors.loa = 'Length overall is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
