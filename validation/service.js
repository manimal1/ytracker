const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateServiceInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.name = !isEmpty(data.name) ? data.name : '';
  data.cost = !isEmpty(data.cost) ? data.cost : '';
  data.charged = !isEmpty(data.charged) ? data.charged : '';
  data.paid = !isEmpty(data.paid) ? data.paid : '';

  if (!validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = 'Name must be between 1 and 30 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (validator.isEmpty(data.cost)) {
    errors.cost = 'Cost field is required';
  }

  if (validator.isEmpty(data.charged)) {
    errors.charged = 'Charged field is required';
  }

  if (validator.isEmpty(data.paid)) {
    errors.paid = 'Paid field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
