const express = require('express');

const router = express.Router();
const passport = require('passport');

// Load Input Validation
const validateCaptainInput = require('../../validation/captain');

// Load User Model
const Captain = require('../../models/Captain');

// @route   GET api/captains
// @des     Get all captains
// @access  Public
router.get(
  '/',
  (req, res) => {
    const errors = {};

    Captain.find()
      .then((captains) => {
        if (!captains) {
          errors.nocaptains = 'There are no captains';
          return res.status(404).json(errors);
        }

        return res.status(200).json(captains);
      })
      .catch((err) => {
        const msg = { captains: 'There are no captains' };
        return res.status(404).json(err, msg);
      });
  },
);

// @route   GET api/captains/:id
// @des     Get a captain by ID
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Captain.findById(req.params.id)
      .then((captain) => {
        if (!captain) {
          errors.nocaptain = 'This captain does not exist';
          return res.status(404).json(errors);
        }

        return res.status(200).json(captain);
      })
      .catch((err) => {
        const msg = { captain: 'There is no matching captain' };
        return res.status(404).json(err, msg);
      });
  },
);

// @route   POST api/captians/register
// @des     Register a captain
// @access  Private
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCaptainInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email } = req.body;

    return Captain.findOne({ email })
      .then((captain) => {
        if (captain) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        }
        const newCaptain = new Captain({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email,
          phone: req.body.phone,
          mobile: req.body.mobile,
          address: req.body.address,
        });

        return newCaptain.save()
          .then(newCaptainObj => res.json(newCaptainObj))
          .catch(err => res.status(400).json(err));
      });
  },
);

// @route   DELETE api/captians/:captain_id
// @des     Delete captain
// @access  Private
router.delete(
  '/:captain_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Captain.findById(req.params.captain_id)
      .deleteOne({ _id: req.params.captain_id })
      .exec()
      .then(() => res.json({ success: true }));
  },
);

module.exports = router;
