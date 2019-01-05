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
    let owningcompany = {};
    owningcompany.address = {};
    let billingcompany = {};
    billingcompany.address = {};
    let managementcompany = {};
    managementcompany.address = {};
    let phone, loa, draft, beam, grosstonnage,
      buildcompany, buildyear, refityear,
      cruisinglicense, taxid;

    const name = req.body.name;
    const email = req.body.email;
    const yachttype = req.body.yachttype;
    const active = req.body.active;
    if (req.body.phone) {
      phone = req.body.phone;
    }
    if (req.body.loa) {
      loa = req.body.loa;
    }
    if (req.body.draft) {
      draft = req.body.draft;
    }
    if (req.body.beam) {
      beam = req.body.beam;
    }
    if (req.body.grosstonnage) {
      grosstonnage = req.body.grosstonnage;
    }
    if (req.body.buildcompany) {
      buildcompany = req.body.buildcompany;
    }
    if (req.body.buildyear) {
      buildyear = req.body.buildyear;
    }
    if (req.body.refityear) {
      refityear = req.body.refityear;
    }
    if (req.body.cruisinglicense) {
      cruisinglicense = req.body.cruisinglicense;
    }
    if (req.body.taxid) {
      taxid = req.body.taxid;
    }

    /* eslint-disable */
    // owning company fields
    if (req.body.owningcompanyname) {
      owningcompany.companyname = req.body.owningcompanyname;
      owningcompany.servicetype = 'Yacht Management';
    }
    if (req.body.owningcompanyemail) {
      owningcompany.email = req.body.owningcompanyemail;
    }
    if (req.body.owningcompanyphone) {
      owningcompany.phone = req.body.owningcompanyphone;
    }
    if (req.body.owningcompanymobile) {
      owningcompany.mobile = req.body.owningcompanymobile;
    }
    if (req.body.owningcompanyaddressline1) {
      owningcompany.address.addressline1 = req.body.owningcompanyaddressline1;
    }
    if (req.body.owningcompanyaddressline2) {
      owningcompany.address.addressline2 = req.body.owningcompanyaddressline2;
    }
    if (req.body.owningcompanycity) {
      owningcompany.address.city = req.body.owningcompanycity;
    }
    if (req.body.owningcompanypostalcode) {
      owningcompany.address.postalcode = req.body.owningcompanypostalcode;
    }
    if (req.body.owningcompanycountry) {
      owningcompany.address.country = req.body.owningcompanycountry;
    }

    // billing company fields
    if (req.body.billingcompanyname) {
      billingcompany.companyname = req.body.billingcompanyname;
      billingcompany.servicetype = 'Yacht Management';
    }
    if (req.body.billingcompanyemail) {
      billingcompany.email = req.body.billingcompanyemail;
    }
    if (req.body.billingcompanyphone) {
      billingcompany.phone = req.body.billingcompanyphone;
    }
    if (req.body.billingcompanymobile) {
      billingcompany.mobile = req.body.billingcompanymobile;
    }
    if (req.body.billingcompanyaddressline1) {
      billingcompany.address.addressline1 = req.body.billingcompanyaddressline1;
    }
    if (req.body.billingcompanyaddressline2) {
      billingcompany.address.addressline2 = req.body.billingcompanyaddressline2;
    }
    if (req.body.billingcompanycity) {
      billingcompany.address.city = req.body.billingcompanycity;
    }
    if (req.body.billingcompanypostalcode) {
      billingcompany.address.postalcode = req.body.billingcompanypostalcode;
    }
    if (req.body.billingcompanycountry) {
      billingcompany.address.country = req.body.billingcompanycountry;
    }

    // management company fields
    if (req.body.managementcompanyname) {
      managementcompany.companyname = req.body.managementcompanyname;
      managementcompany.servicetype = 'Yacht Management';
    }
    if (req.body.managementcompanyemail) {
      managementcompany.email = req.body.managementcompanyemail;
    }
    if (req.body.managementcompanyphone) {
      managementcompany.phone = req.body.managementcompanyphone;
    }
    if (req.body.managementcompanymobile) {
      managementcompany.mobile = req.body.managementcompanymobile;
    }
    if (req.body.managementcompanyaddressline1) {
      managementcompany.address.addressline1 = req.body.managementcompanyaddressline1;
    }
    if (req.body.managementcompanyaddressline2) {
      managementcompany.address.addressline2 = req.body.managementcompanyaddressline2;
    }
    if (req.body.managementcompanycity) {
      managementcompany.address.city = req.body.managementcompanycity;
    }
    if (req.body.managementcompanypostalcode) {
      managementcompany.address.postalcode = req.body.managementcompanypostalcode;
    }
    if (req.body.managementcompanycountry) {
      managementcompany.address.country = req.body.managementcompanycountry;
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
            name, email, yachttype, active, phone, loa, draft, beam,
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
    let phone, loa, draft, beam, grosstonnage,
      buildcompany, buildyear, refityear,
      cruisinglicense, taxid;

    const name = req.body.name;
    const email = req.body.email;
    const yachttype = req.body.yachttype;
    const active = req.body.active;
    if (req.body.phone) {
      phone = req.body.phone;
    }
    if (req.body.loa) {
      loa = req.body.loa;
    }
    if (req.body.draft) {
      draft = req.body.draft;
    }
    if (req.body.beam) {
      beam = req.body.beam;
    }
    if (req.body.grosstonnage) {
      grosstonnage = req.body.grosstonnage;
    }
    if (req.body.buildcompany) {
      buildcompany = req.body.buildcompany;
    }
    if (req.body.buildyear) {
      buildyear = req.body.buildyear;
    }
    if (req.body.refityear) {
      refityear = req.body.refityear;
    }
    if (req.body.cruisinglicense) {
      cruisinglicense = req.body.cruisinglicense;
    }
    if (req.body.taxid) {
      taxid = req.body.taxid;
    }

    /* eslint-disable */
    // owning company fields
    if (req.body.owningcompanyname) {
      owningcompany.companyname = req.body.owningcompanyname;
      owningcompany.servicetype = 'Yacht Management';
    }
    if (req.body.owningcompanyemail) {
      owningcompany.email = req.body.owningcompanyemail;
    }
    if (req.body.owningcompanyphone) {
      owningcompany.phone = req.body.owningcompanyphone;
    }
    if (req.body.owningcompanymobile) {
      owningcompany.mobile = req.body.owningcompanymobile;
    }
    if (req.body.owningcompanyaddressline1) {
      owningcompany.address.addressline1 = req.body.owningcompanyaddressline1;
    }
    if (req.body.owningcompanyaddressline2) {
      owningcompany.address.addressline2 = req.body.owningcompanyaddressline2;
    }
    if (req.body.owningcompanycity) {
      owningcompany.address.city = req.body.owningcompanycity;
    }
    if (req.body.owningcompanypostalcode) {
      owningcompany.address.postalcode = req.body.owningcompanypostalcode;
    }
    if (req.body.owningcompanycountry) {
      owningcompany.address.country = req.body.owningcompanycountry;
    }

    // billing company fields
    if (req.body.billingcompanyname) {
      billingcompany.companyname = req.body.billingcompanyname;
      billingcompany.servicetype = 'Yacht Management';
    }
    if (req.body.billingcompanyemail) {
      billingcompany.email = req.body.billingcompanyemail;
    }
    if (req.body.billingcompanyphone) {
      billingcompany.phone = req.body.billingcompanyphone;
    }
    if (req.body.billingcompanymobile) {
      billingcompany.mobile = req.body.billingcompanymobile;
    }
    if (req.body.billingcompanyaddressline1) {
      billingcompany.address.addressline1 = req.body.billingcompanyaddressline1;
    }
    if (req.body.billingcompanyaddressline2) {
      billingcompany.address.addressline2 = req.body.billingcompanyaddressline2;
    }
    if (req.body.billingcompanycity) {
      billingcompany.address.city = req.body.billingcompanycity;
    }
    if (req.body.billingcompanypostalcode) {
      billingcompany.address.postalcode = req.body.billingcompanypostalcode;
    }
    if (req.body.billingcompanycountry) {
      billingcompany.address.country = req.body.billingcompanycountry;
    }

    // management company fields
    if (req.body.managementcompanyname) {
      managementcompany.companyname = req.body.managementcompanyname;
      managementcompany.servicetype = 'Yacht Management';
    }
    if (req.body.managementcompanyemail) {
      managementcompany.email = req.body.managementcompanyemail;
    }
    if (req.body.managementcompanyphone) {
      managementcompany.phone = req.body.managementcompanyphone;
    }
    if (req.body.managementcompanymobile) {
      managementcompany.mobile = req.body.managementcompanymobile;
    }
    if (req.body.managementcompanyaddressline1) {
      managementcompany.address.addressline1 = req.body.managementcompanyaddressline1;
    }
    if (req.body.managementcompanyaddressline2) {
      managementcompany.address.addressline2 = req.body.managementcompanyaddressline2;
    }
    if (req.body.managementcompanycity) {
      managementcompany.address.city = req.body.managementcompanycity;
    }
    if (req.body.managementcompanypostalcode) {
      managementcompany.address.postalcode = req.body.managementcompanypostalcode;
    }
    if (req.body.managementcompanycountry) {
      managementcompany.address.country = req.body.managementcompanycountry;
    }
    /* eslint-enable */

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Yacht.findByIdAndUpdate(
      req.params.yacht_id,
      {
        name, email, yachttype, active, phone, loa, draft, beam,
        grosstonnage, buildcompany, buildyear, refityear,
        owningcompany, billingcompany, managementcompany,
        cruisinglicense, taxid,
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
