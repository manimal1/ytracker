const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load input validation
const validateCompanyRegisterInput = require('../../validation/company-register'); // eslint-disable-line max-len

// Load Company Model
const Company = require('../../models/Company');

// @route   GET api/company
// @des     Get all companies
// @access  Public
router.get(
  '/',
  (req, res) => {
    const errors = {};

    Company.find()
      .then(companies => {
        if (!companies) {
          errors.nocompanies = 'There are no companies';
          return res.status(404).json(errors);
        }

        res.json(companies);
      })
      .catch(err => {
        err.msg = { companies: 'There are no companies' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/company/:id
// @des     Get a company by ID
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Company.findById(req.params.id)
      .then(company => {
        if (!company) {
          errors.nocompany = 'This company does not exist';
          return res.status(404).json(errors);
        }

        res.json(company);
      })
      .catch(err => {
        err.msg = { company: 'There is no matching company' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   POST api/company/register
// @des     Register a company
// @access  Private
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const companyname = req.body.companyname;
    const servicetype = req.body.servicetype;
    const email = req.body.email;
    const phone = req.body.phone;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const { errors, isValid } = validateCompanyRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Company.findOne({ email: email })
      .then(company => {
        if (company) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          const newCompany = new Company({
            companyname,
            servicetype,
            email,
            phone,
            mobile,
            address,
          });

          newCompany.save()
            .then(yacht => res.json(yacht))
            .catch(err => console.log(err));
        }
      });
  }
);

// @route   DELETE api/company/:company_id
// @des     Delete company
// @access  Private
router.delete(
  '/:company_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Company.findById(req.params.company_id)
      .deleteOne({ _id: req.params.company_id })
      .exec()
      .then(() => res.json({ success: true }));
  }
);

module.exports = router;
