const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const passport = require('passport');
// Load async middleware to allow for async await in express calls
const asyncMiddleware = require('../../utils/asyncMiddleware');

// Load input validation
const validateYachtInput = require('../../validation/yacht-register');
const validateServiceInput = require('../../validation/service');

// Load Yacht Model
const Yacht = require('../../models/Yacht');
// Load Company Model
const Company = require('../../models/Company');
// Load Service Model
const Service = require('../../models/Service');

// @route   GET api/yachts
// @des     Get all yachts
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const errors = {};

    Yacht.find()
      .then(yachts => {
        if (!yachts) {
          errors.noyachts = 'There are no yachts';
          return res.status(404).json(errors);
        }

        res.json(yachts);
      })
      .catch(err => {
        err.msg = { yachts: 'There are no yachts' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/yachts/:id
// @des     Get a yacht by ID
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Yacht.findById(req.params.id)
      .then(yacht => {
        if (!yacht) {
          errors.noyacht = 'This yacht does not exist';
          return res.status(404).json(errors);
        }

        res.json(yacht);
      })
      .catch(err => {
        err.msg = { yacht: 'There is no matching yacht' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   POST api/yachts/register
// @des     Register a yacht
// @access  Private
router.post(
  '/register',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateYachtInput(req.body);
    let owningcompany = {};
    owningcompany.address = {};
    let billingcompany = {};
    billingcompany.address = {};
    let managementcompany = {};
    managementcompany.address = {};

    /* eslint-disable */
    const createdby = req.user.id;
    const name = req.body.name;
    const email = req.body.email;
    const yachttype = req.body.yachttype;
    const active = req.body.active;
    const phone = req.body.phone;
    const loa = req.body.loa;
    const draft = req.body.draft;
    const beam = req.body.beam;
    const grosstonnage = req.body.grosstonnage;
    const buildcompany = req.body.buildcompany;
    const buildyear = req.body.buildyear;
    const refityear = req.body.refityear;
    const cruisinglicense = req.body.cruisinglicense;
    const taxid = req.body.taxid;
    if (req.body.billingcompany) {
      billingcompany = req.body.billingcompany;
      billingcompany.servicetype = 'Yacht Management';
    }
    if (req.body.owningcompany) {
      owningcompany = req.body.owningcompany;
      owningcompany.servicetype = 'Yacht Management';
    }
    if (req.body.managementcompany) {
      managementcompany = req.body.managementcompany;
      managementcompany.servicetype = 'Yacht Management';
    }
    /* eslint-enable */

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Yacht.findOne({ email: email })
      .then(yacht => {
        if (yacht) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          const newYacht = new Yacht({
            createdby, name, email, yachttype, active, phone, loa, draft, beam,
            grosstonnage, buildcompany, buildyear, refityear,
            owningcompany, billingcompany, managementcompany,
            cruisinglicense, taxid,
          });

          newYacht.save()
            .then(yacht => res.json(yacht))
            .catch(err => console.log(err));
        }
      });
  }
);

// @route   POST api/yachts/:yacht_id
// @des     Update a yacht
// @access  Private
router.post(
  '/:yacht_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateYachtInput(req.body);
    let owningcompany = {};
    owningcompany.address = {};
    let billingcompany = {};
    billingcompany.address = {};
    let managementcompany = {};
    managementcompany.address = {};

    /* eslint-disable */
    const createdby = req.user.id;
    const name = req.body.name;
    const email = req.body.email;
    const yachttype = req.body.yachttype;
    const active = req.body.active;
    const phone = req.body.phone;
    const loa = req.body.loa;
    const draft = req.body.draft;
    const beam = req.body.beam;
    const grosstonnage = req.body.grosstonnage;
    const buildcompany = req.body.buildcompany;
    const buildyear = req.body.buildyear;
    const refityear = req.body.refityear;
    const cruisinglicense = req.body.cruisinglicense;
    const taxid = req.body.taxid;
    if (req.body.billingcompany) {
      billingcompany = req.body.billingcompany;
      billingcompany.servicetype = 'Yacht Management';
    }
    if (req.body.owningcompany) {
      owningcompany = req.body.owningcompany;
      owningcompany.servicetype = 'Yacht Management';
    }
    if (req.body.managementcompany) {
      managementcompany = req.body.managementcompany;
      managementcompany.servicetype = 'Yacht Management';
    }
    /* eslint-enable */

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Yacht.findByIdAndUpdate(
      req.params.yacht_id,
      {
        createdby, name, email, yachttype, active, phone, loa, draft, beam,
        grosstonnage, buildcompany, buildyear, refityear,
        cruisinglicense, taxid,
        owningcompany, billingcompany, managementcompany,
      },
      { new: true }
    )
      .then(yacht => res.json(yacht))
      .catch(err => {
        errors.name = 'Yacht does not exist';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route   POST api/yachts/service/:yachtId&:companyId
// @des     Add a service to a yacht
// @access  Private
router.post(
  '/service/:yachtId&:companyId',
  passport.authenticate('jwt', {session: false}),
  asyncMiddleware(async(req, res, next) => {
    const { errors, isValid } = validateServiceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { yachtId, companyId } = req.params;
    const newService = new Service(req.body);
    const yacht = await Yacht.findById(yachtId);
    const company = await Company.findById(companyId);

    newService.createdby = req.user.id;
    newService.yacht = yacht;
    newService.company = company;
    // save the service to services collection
    await newService.save();
    // Add service to the yacht's services array
    yacht.services.push(newService);
    await yacht.save();
    // Add service to the company's services array
    company.services.push(newService);
    await company.save();
    res.status(201).json(newService);
  })
);

// @route   GET api/yachts/service/getall/:yachtId
// @des     Add a service to a yacht
// @access  Private
router.get(
  '/service/getall/:yachtId',
  passport.authenticate('jwt', {session: false}),
  asyncMiddleware(async(req, res, next) => {
    const { yachtId } = req.params;
    const yacht = await Yacht.findById(yachtId);
    const yachtServices = yacht.services;
    const allYachtServices = yachtServices.map(async serviceId => {
      const service = await Service.findById(serviceId);
      return service;
    });
    Promise.all(allYachtServices) // eslint-disable-line no-undef
      .then(services => res.status(201).json(services));
  })
);

// @route   DELETE api/yachts/:yacht_id
// @des     Delete yacht
// @access  Private
router.delete(
  '/:yachtId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Yacht.findById(req.params.yachtId)
      .deleteOne({ _id: req.params.yachtId })
      .exec()
      .then(() => res.json({ success: true }));
  }
);

module.exports = router;
