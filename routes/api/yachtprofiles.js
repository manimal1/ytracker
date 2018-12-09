const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateYachtProfileInput = require('../../validation/yacht-profile');

// Load models
const YachtProfile = require('../../models/YachtProfile');

// @route   GET api/yachtprofiles
// @des     Get all yacht profiles
// @access  Public
router.get(
  '/',
  (req, res) => {
    const errors = {};

    YachtProfile.find()
      .populate('yacht', ['type', 'name', 'email', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no yacht profiles';
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => {
        err.msg = { profile: 'There are no profiles' };
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/yachtprofiles/yacht/:id
// @des     Get yacht profile by yacht ID
// @access  Private
router.get(
  '/yacht/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const errors = {};
    YachtProfile.findOne({ yacht: req.params.id })
      .populate('yacht', ['type', 'name', 'email', 'avatar'])
      .populate('services')
      .then(profile => {
        if (!profile) {
          errors.yachtdoesnotexist = 'This yacht does not exist';
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/yachtprofiles/yacht/:id
// @des     Create or edit yacht profile
// @access  Private
router.post(
  '/yacht/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateYachtProfileInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.yacht = req.params.id;
    /* eslint-disable */
    if (req.body.currentclient) profileFields.currentclient = req.body.currentclient;
    profileFields.createdby = req.user.id;
    if (req.body.loa) profileFields.loa = req.body.loa;
    if (req.body.draft) profileFields.draft = req.body.draft;
    if (req.body.beam) profileFields.beam = req.body.beam;
    if (req.body.cruisinglicense) profileFields.cruisinglicense = req.body.cruisinglicense;
    if (req.body.taxid) profileFields.taxid = req.body.taxid;
    if (req.body.owningcompany) profileFields.owningcompany = req.body.owningcompany;
    if (req.body.owningcompanyaddress) {
      profileFields.owningcompanyaddress = req.body.owningcompanyaddress;
    }
    if (req.body.buildcompany) profileFields.buildcompany = req.body.buildcompany;
    if (req.body.buildyear) profileFields.buildyear = req.body.buildyear;
    if (req.body.refityear) profileFields.refityear = req.body.refityear;
    /* eslint-enable */

    YachtProfile.findOne({ yacht: req.params.id })
      .populate('services')
      .then(profile => {
        if (profile) {
          profileFields.services = profile.services;
          // Update
          YachtProfile.findOneAndUpdate(
            { yacht: req.params.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile));
        } else {
          new YachtProfile(profileFields)
            .save()
            .then(profile => res.json(profile));
        }
      });
  }
);

module.exports = router;
