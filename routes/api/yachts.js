const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const passport = require('passport');

// Load input validation
const validateYachtInput = require('../../validation/yacht-register');

// Load Yacht Model
const Yacht = require('../../models/Yacht');

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
    let owningCompanyProperties = {};
    owningCompanyProperties.address = {};
    let billingCompanyProperties = {};
    billingCompanyProperties.address = {};
    let managementCompanyProperties = {};
    managementCompanyProperties.address = {};

    const name = req.body.name;
    const email = req.body.email;
    const yachttype = req.body.yachttype;
    const loa = req.body.loa ? req.body.loa : '';
    const draft = req.body.draft ? req.body.draft : '';
    const beam = req.body.beam ? req.body.beam : '';
    const grosstonnage = req.body.grosstonnage ? req.body.grosstonnage : '';
    const buildcompany = req.body.buildcompany ? req.body.buildcompany : '';
    const buildyear = req.body.buildyear ? req.body.buildyear : '';
    const refityear = req.body.refityear ? req.body.refityear : '';

    /* eslint-disable */
    // owning company fields
    if (req.body.owningcompanyname) {
      owningCompanyProperties.companyname = req.body.owningcompanyname;
      owningCompanyProperties.servicetype = 'Yacht Management';
    }
    if (req.body.owningcompanyemail) {
      owningCompanyProperties.email = req.body.owningcompanyemail;
    }
    if (req.body.owningcompanyphone) {
      owningCompanyProperties.phone = req.body.owningcompanyphone;
    }
    if (req.body.owningcompanymobile) {
      owningCompanyProperties.mobile = req.body.owningcompanymobile;
    }
    if (req.body.owningcompanyaddressline1) {
      owningCompanyProperties.address.addressline1 = req.body.owningcompanyaddressline1;
    }
    if (req.body.owningcompanyaddressline2) {
      owningCompanyProperties.address.addressline2 = req.body.owningcompanyaddressline2;
    }
    if (req.body.owningcompanycity) {
      owningCompanyProperties.address.city = req.body.owningcompanycity;
    }
    if (req.body.owningcompanypostalcode) {
      owningCompanyProperties.address.postalcode = req.body.owningcompanypostalcode;
    }
    if (req.body.owningcompanycountry) {
      owningCompanyProperties.address.country = req.body.owningcompanycountry;
    }

    // billing company fields
    if (req.body.billingcompanyname) {
      billingCompanyProperties.companyname = req.body.billingcompanyname;
      billingCompanyProperties.servicetype = 'Yacht Management';
    }
    if (req.body.billingcompanyemail) {
      billingCompanyProperties.email = req.body.billingcompanyemail;
    }
    if (req.body.billingcompanyphone) {
      billingCompanyProperties.phone = req.body.billingcompanyphone;
    }
    if (req.body.billingcompanymobile) {
      billingCompanyProperties.mobile = req.body.billingcompanymobile;
    }
    if (req.body.billingcompanyaddressline1) {
      billingCompanyProperties.address.addressline1 = req.body.billingcompanyaddressline1;
    }
    if (req.body.billingcompanyaddressline2) {
      billingCompanyProperties.address.addressline2 = req.body.billingcompanyaddressline2;
    }
    if (req.body.billingcompanycity) {
      billingCompanyProperties.address.city = req.body.billingcompanycity;
    }
    if (req.body.billingcompanypostalcode) {
      billingCompanyProperties.address.postalcode = req.body.billingcompanypostalcode;
    }
    if (req.body.billingcompanycountry) {
      billingCompanyProperties.address.country = req.body.billingcompanycountry;
    }

    // management company fields
    if (req.body.managementcompanyname) {
      managementCompanyProperties.companyname = req.body.managementcompanyname;
      managementCompanyProperties.servicetype = 'Yacht Management';
    }
    if (req.body.managementcompanyemail) {
      managementCompanyProperties.email = req.body.managementcompanyemail;
    }
    if (req.body.managementcompanyphone) {
      managementCompanyProperties.phone = req.body.managementcompanyphone;
    }
    if (req.body.managementcompanymobile) {
      managementCompanyProperties.mobile = req.body.managementcompanymobile;
    }
    if (req.body.managementcompanyaddressline1) {
      managementCompanyProperties.address.addressline1 = req.body.managementcompanyaddressline1;
    }
    if (req.body.managementcompanyaddressline2) {
      managementCompanyProperties.address.addressline2 = req.body.managementcompanyaddressline2;
    }
    if (req.body.managementcompanycity) {
      managementCompanyProperties.address.city = req.body.managementcompanycity;
    }
    if (req.body.managementcompanypostalcode) {
      managementCompanyProperties.address.postalcode = req.body.managementcompanypostalcode;
    }
    if (req.body.managementcompanycountry) {
      managementCompanyProperties.address.country = req.body.managementcompanycountry;
    }
    
    /* eslint-enable */
    const owningcompany = owningCompanyProperties;
    const billingcompany = billingCompanyProperties;
    const managementcompany = managementCompanyProperties;

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
            name, email, yachttype, loa, draft, beam,
            grosstonnage, buildcompany, buildyear, refityear,
            owningcompany, billingcompany, managementcompany,
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
    let owningCompanyProperties = {};
    let billingCompanyProperties = {};
    let managementCompanyProperties = {};

    const name = req.body.name;
    const email = req.body.email;
    const yachttype = req.body.yachttype;
    const loa = req.body.loa ? req.body.loa : '';
    const draft = req.body.draft ? req.body.draft : '';
    const beam = req.body.beam ? req.body.beam : '';
    const grosstonnage = req.body.grosstonnage ? req.body.grosstonnage : '';
    const buildcompany = req.body.buildcompany ? req.body.buildcompany : '';
    const buildyear = req.body.buildyear ? req.body.buildyear : '';
    const refityear = req.body.refityear ? req.body.refityear : '';

    /* eslint-disable */
    // owning company fields
    if (req.body.owningcompanyname) {
      owningCompanyProperties.companyname = req.body.owningcompanyname;
      owningCompanyProperties.servicetype = 'Yacht Management';
    }
    if (req.body.owningcompanyemail) {
      owningCompanyProperties.email = req.body.owningcompanyemail;
    }
    if (req.body.owningcompanyphone) {
      owningCompanyProperties.phone = req.body.owningcompanyphone;
    }
    if (req.body.owningcompany.mobile) {
      owningCompanyProperties.mobile = req.body.owningcompanymobile;
    }
    if (req.body.owningcompany.addressline1) {
      owningCompanyProperties.address.addressline1 = req.body.owningcompanyaddressline1;
    }
    if (req.body.owningcompany.addressline2) {
      owningCompanyProperties.address.addressline2 = req.body.owningcompanyaddressline2;
    }
    if (req.body.owningcompany.city) {
      owningCompanyProperties.address.city = req.body.owningcompanycity;
    }
    if (req.body.owningcompany.postalcode) {
      owningCompanyProperties.address.postalcode = req.body.owningcompanypostalcode;
    }
    if (req.body.owningcompany.country) {
      owningCompanyProperties.address.country = req.body.owningcompanycountry;
    }

    // billing company fields
    if (req.body.billingcompanyname) {
      billingCompanyProperties.companyname = req.body.billingcompanyname;
      billingCompanyProperties.servicetype = 'Yacht Management';
    }
    if (req.body.billingcompanyemail) {
      billingCompanyProperties.email = req.body.billingcompanyemail;
    }
    if (req.body.billingcompanyphone) {
      billingCompanyProperties.phone = req.body.billingcompanyphone;
    }
    if (req.body.billingcompanymobile) {
      billingCompanyProperties.mobile = req.body.billingcompanymobile;
    }
    if (req.body.billingcompanyaddressline1) {
      billingCompanyProperties.address.addressline1 = req.body.billingcompanyaddressline1;
    }
    if (req.body.billingcompanyaddressline2) {
      billingCompanyProperties.address.addressline2 = req.body.billingcompanyaddressline2;
    }
    if (req.body.billingcompanycity) {
      billingCompanyProperties.address.city = req.body.billingcompanycity;
    }
    if (req.body.billingcompanypostalcode) {
      billingCompanyProperties.address.postalcode = req.body.billingcompanypostalcode;
    }
    if (req.body.billingcompanycountry) {
      billingCompanyProperties.address.country = req.body.billingcompanycountry;
    }

    // management company fields
    if (req.body.managementcompanyname) {
      managementCompanyProperties.companyname = req.body.managementcompanyname;
      managementCompanyProperties.servicetype = 'Yacht Management';
    }
    if (req.body.managementcompanyemail) {
      managementCompanyProperties.email = req.body.managementcompanyemail;
    }
    if (req.body.managementcompanyphone) {
      managementCompanyProperties.phone = req.body.managementcompanyphone;
    }
    if (req.body.managementcompanymobile) {
      managementCompanyProperties.mobile = req.body.managementcompanymobile;
    }
    if (req.body.managementcompanyaddressline1) {
      managementCompanyProperties.address.addressline1 = req.body.managementcompanyaddressline1;
    }
    if (req.body.managementcompanyaddressline2) {
      managementCompanyProperties.address.addressline2 = req.body.managementcompanyaddressline2;
    }
    if (req.body.managementcompanycity) {
      managementCompanyProperties.address.city = req.body.managementcompanycity;
    }
    if (req.body.managementcompanypostalcode) {
      managementCompanyProperties.address.postalcode = req.body.managementcompanypostalcode;
    }
    if (req.body.managementcompanycountry) {
      managementCompanyProperties.address.country = req.body.managementcompanycountry;
    }
    
    /* eslint-enable */
    const owningcompany = owningCompanyProperties;
    const billingcompany = billingCompanyProperties;
    const managementcompany = managementCompanyProperties;

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Yacht.findById(req.params.yacht_id)
      .then(yacht => {
        if (yacht) {
          Yacht.findOneAndUpdate(
            { _id: req.params.yacht_id },
            {
              name, email, yachttype, loa, draft, beam,
              grosstonnage, buildcompany, buildyear, refityear,
              owningcompany, billingcompany, managementcompany,
            },
            { new: true }
          )
            .then(yacht => res.json(yacht));
        } else {
          errors.name = 'Yacht does not exist';
          return res.status(400).json(errors);
        }
      });
  }
);

// @route   DELETE api/yachts/:yacht_id
// @des     Delete yacht
// @access  Private
router.delete(
  '/:yacht_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Yacht.findById(req.params.yacht_id)
      .deleteOne({ _id: req.params.yacht_id })
      .exec()
      .then(() => res.json({ success: true }));
  }
);

module.exports = router;
