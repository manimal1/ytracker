const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateServiceInput = require('../../validation/service');

// Load models
const Service = require('../../models/Service');
// const Company = require('../../models/Company');

// @route   GET api/services
// @des     Get all services
// @access  Public
router.get(
  '/',
  (req, res) => {
    const errors = {};

    Service.find()
      .then(services => {
        if (!services) {
          errors.noservices = 'There are no services';
          return res.status(404).json(errors);
        }

        res.json(services);
      })
      .catch(err => {
        err.msg = { services: 'There are no services' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/services/yacht/:yachtprofile_id
// @des     Get all services for one yacht
// @access  Private
router.get(
  '/yacht/:yachtprofile_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Service.find({ yachtprofile: req.params.yachtprofile_id })
      .then(services => {
        if (!services) {
          errors.noservices = 'There are no services for this yacht';
          return res.status(404).json(errors);
        }

        res.json(services);
      })
      .catch(err => {
        err.msg = { services: 'There are no services for this yacht' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/services/company/:company_id
// @des     Get all services for one company
// @access  Private
router.get(
  '/company/:company_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Service.find({ company: req.params.company_id })
      .then(services => {
        if (!services) {
          errors.noservices = 'There are no services for this company';
          return res.status(404).json(errors);
        }

        res.json(services);
      })
      .catch(err => {
        err.msg = { services: 'There are no services for this company' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   POST api/services/add/:yacht_id&:company_id
// @des     Add a service linked to a yacht
// @access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateServiceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const createdby = req.user.id;
    const service = Object.assign({}, req.body, {createdby});

    const newService = new Service(service);

    newService.save().then(post => res.json(post));
  }
);

// @route   DELETE api/services/service/:service_id
// @des     Delete service item
// @access  Private
router.delete(
  '/service/:service_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Service.findById(req.params.service_id)
      .deleteOne({ _id: req.params.service_id })
      .exec()
      .then(() => res.json({ success: true }));
  }
);

module.exports = router;
