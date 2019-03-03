const express = require('express');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route   POST api/users/register
// @des     Register a user
// @access  Public
router.post('/register', (req, res) => {
  const { email } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }

      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm', // default
      });
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email,
        password: req.body.password,
        avatar,
      });
      /* eslint-disable handle-callback-err */
      return bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser.save()
            .then(newSavedUser => res.json(newSavedUser))
            .catch(saveError => console.log(saveError)); // eslint-disable-line no-console
        });
      });
      /* eslint-enable */
    });
});

// @route   POST api/users/login
// @des     Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by email
  return User.findOne({ email })
    .then((user) => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      // check Password
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // User matched
            // create JWT payload
            const payload = {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              avatar: user.avatar,
              email: user.email,
            };

            // Sign the token
            return jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) {
                  console.log(err); // eslint-disable-line no-console
                }
                res.json({ success: true, token: `Bearer ${token}` });
              }
            );
          }
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        });
    });
});

// @route   GET api/users
// @des     Get all users
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    User.find()
      .then((users) => {
        if (!users) {
          errors.nousers = 'There are no users';
          return res.status(404).json(errors);
        }

        return res.status(200).json(users);
      })
      .catch((err) => {
        err.msg = { users: 'There are no users' }; // eslint-disable-line no-param-reassign
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/users/current
// @des     Return current user
// @access  Private
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  });

module.exports = router;
