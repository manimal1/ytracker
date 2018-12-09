const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

// @route     GET api/posts
// @desc      Get posts
// @access    Public
router.get(
  '/',
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => {
        err.nopostsfound = 'No posts found';
        res.status(404).json(err.nopostsfound);
      });
  }
);

// @route     GET api/posts/:id
// @desc      Get post by id
// @access    Public
router.get(
  '/:id',
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => {
        err.nopostfound = 'No post found with that id';
        res.status(404).json(err.nopostfound);
      });
  }
);

// @route     POST api/posts
// @desc      Create post
// @access    Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route     DELETE api/posts/:id
// @desc      Delete post
// @access    Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ notauthorized: 'user not authorized' }); // eslint-disable-line max-len
            }

            post.remove().then(() => res.json({ success: true}));
          })
          .catch(err => {
            err.postnotfound = 'Post not found';
            res.status(404).json(err.postnotfound);
          });
      });
  }
);

// @route     POST api/posts/like/:id
// @desc      Like post
// @access    Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            /* eslint-disable */
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
              return res.status(400).json({ alreadyliked: 'You have already liked this post' });
            }
            /* eslint-enable */

            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          })
          .catch(err => {
            err.postnotfound = 'Post not found';
            res.status(404).json(err.postnotfound);
          });
      });
  }
);

// @route     POST api/posts/unlike/:id
// @desc      Unlike post
// @access    Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            /* eslint-disable */
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({ notliked: 'You have not yet liked this post' });
            }
            /* eslint-enable */

            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
          })
          .catch(err => {
            err.postnotfound = 'Post not found';
            res.status(404).json(err.postnotfound);
          });
      });
  }
);

// @route     POST api/posts/comment/:id
// @desc      Add comment to post
// @access    Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array and save
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        err.postnotfound = 'No post found';
        return res.status(404).json(err.postnotfound);
      });
  }
);

// @route     DELETE api/posts/comment/:id/:comment_id
// @desc      Remove comment from post
// @access    Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // check to see if comment exists
        if (
          post.comments
            .filter(comment => comment._id.toString() === req.params.comment_id)
            .length === 0
        ) {
          return res.status(404).json({ commentdoesnotexist: 'Comment does not exist' }); // eslint-disable-line max-len
        }

        // Get index to remove
        const removeIndex = post.comments
          .map(item => item._id.toString()).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        err.postnotfound = 'No post found';
        return res.status(404).json(err.postnotfound);
      });
  }
);

module.exports = router;
