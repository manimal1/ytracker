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
      .then((profiles) => {
        if (!profiles) {
          errors.noprofile = 'There are no yacht profiles';
          return res.status(404).json(errors);
        }

        return res.json(profiles);
      })
      .catch((err) => {
        err.msg = { profile: 'There are no profiles' };
        return res.status(404).json(err.msg);
      });
  },
);

// @route   GET api/yachtprofiles/:id
// @des     Get yacht profile by yacht ID
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    YachtProfile.findOne({ yacht: req.params.id })
      .populate('yacht', ['type', 'name', 'email', 'avatar'])
      .populate('services')
      .then((profile) => {
        if (!profile) {
          errors.yachtdoesnotexist = 'This yacht does not exist';
          return res.status(404).json(errors);
        }

        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  },
);

// @route   POST api/yachtprofiles/:id
// @des     Create or edit yacht profile
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
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
    if (req.body.active) profileFields.active = req.body.active;
    profileFields.createdby = req.user.id;
    if (req.body.cruisinglicense) profileFields.cruisinglicense = req.body.cruisinglicense;
    if (req.body.taxid) profileFields.taxid = req.body.taxid;
    /* eslint-enable */

    return YachtProfile.findOne({ yacht: req.params.id })
      .populate('services')
      .then((profile) => {
        if (profile) {
          profileFields.services = profile.services;
          // Update
          YachtProfile.findOneAndUpdate(
            { yacht: req.params.id },
            { $set: profileFields },
            { new: true },
          )
            .then(existingProfile => res.json(existingProfile));
        } else {
          new YachtProfile(profileFields)
            .save()
            .then(newProfile => res.json(newProfile));
        }
      });
  },
);

module.exports = router;
