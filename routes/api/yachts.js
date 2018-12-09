const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');

// Load input validation
const validateYachtInput = require('../../validation/yacht-register');

// Load Yacht Model
const Yacht = require('../../models/Yacht');

// @route   GET api/yachts
// @des     Get all yachts
// @access  Public
router.get(
  '/',
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
// @access  Public
router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const yachttype = req.body.yachttype;
  const { errors, isValid } = validateYachtInput(req.body);

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
        const avatar = gravatar.url(email, {
          s: '200', // size
          r: 'pg', // rating
          d: 'mm', // default
        });

        const newYacht = new Yacht({
          name,
          email,
          yachttype,
          avatar,
        });

        newYacht.save()
          .then(yacht => res.json(yacht))
          .catch(err => console.log(err));
      }
    });
});

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
