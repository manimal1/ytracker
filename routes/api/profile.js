const express = require('express');

const router = express.Router();
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile
// @des     Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }

        return res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/:profileId
// @des     Get user profile by ID
// @access  Private
router.get(
  '/:profileId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne(req.params.profileId)
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'This profile does not exist';
          return res.status(404).json(errors);
        }

        return res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @des     Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['firstname', 'lastname', 'avatar'])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      return res.status(200).json(profiles);
    })
    .catch((err) => {
      err.msg = { profile: 'There is no profiles' };
      return res.status(404).json(err.msg);
    });
});

// @route   GET api/profile/handle/:handle
// @des     Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => {
      err.msg = { profile: 'There is no profile for this user' };
      return res.status(404).json(err.msg);
    });
});

// @route   GET api/profile/user/:user_id
// @des     Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => {
      err.msg = { profile: 'There is no profile for this user' };
      return res.status(404).json(err.msg);
    });
});

// @route   POST api/profile
// @des     Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.social = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.firstname) profileFields.firstname = req.body.firstname;
    if (req.body.lastname) profileFields.lastname = req.body.lastname;
    if (req.body.role) profileFields.role = req.body.role;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.assignedYachts) {
      profileFields.assignedYachts = req.body.assignedYachts;
    }
    if (req.body.bio) profileFields.bio = req.body.bio;
    // if (typeof req.body.skills !== 'undefined') {
    //   profileFields.skills = req.body.skills.split(',');
    // }

    // Social Media
    if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;

    return Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(foundProfile => res.status(200).json(foundProfile));
      } else {
        // Create
        // First check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(
          (profileWithHandle) => {
            if (profileWithHandle) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }

            // Save profile
            new Profile(profileFields)
              .save()
              .then(savedProfile => res.json(savedProfile));
          }
        );
      }
    });
  }
);

// @route   POST api/profile/experience
// @des     Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    return Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newExperience);
      profile.save().then(savedProfile => res.json(savedProfile));
    });
  }
);

// @route   POST api/profile/education
// @des     Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    return Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEducation);
      profile.save().then(savedProfile => res.json(savedProfile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @des     Delete experience item from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get index of experience to remove
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        // remove exp from experience array and save
        profile.experience.splice(removeIndex, 1);
        profile.save().then(res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:ed_id
// @des     Delete education item from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get index of education to remove
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        // remove exp from education array and save
        profile.education.splice(removeIndex, 1);
        profile.save().then(res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @des     Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
