const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!validator.isLength(data.text, { min: 10, max: 5000 })) {
    errors.text = 'Post must be between 10 and 5000 characters';
  }

  if (validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
