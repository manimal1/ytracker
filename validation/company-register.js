const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompanyRegisterInput(data) {
  let errors = {};
  // make sure an empty fields are set as strings
  // so the validator library works
  data.companyname = !isEmpty(data.companyname) ? data.companyname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.servicetype = !isEmpty(data.servicetype) ? data.servicetype : '';

  if (!validator.isLength(data.companyname, { min: 1, max: 30 })) {
    errors.companyname = 'Company name must be between 1 and 30 characters';
  }

  if (validator.isEmpty(data.companyname)) {
    errors.companyname = 'Company name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (validator.isEmpty(data.servicetype)) {
    errors.servicetype = 'Service type field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
