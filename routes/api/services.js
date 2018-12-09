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

// @route   GET api/services/:yachtprofile_id
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

// @route   GET api/services/:company_id
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

// @route   POST api/services/:yacht_id/:company_id
// @des     Add a service linked to a yacht
// @access  Private
router.post(
  '/register/:yacht_id&:company_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateServiceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let company = req.params.company_id || '';
    const newService = new Service({
      name: req.body.name,
      company,
      createdby: req.user.id,
      yachtprofile: req.params.yacht_id,
      cost: req.body.cost,
      charged: req.body.charged,
      paid: req.body.paid,
    });

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
