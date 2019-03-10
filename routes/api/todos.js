const express = require('express');

const router = express.Router();
const passport = require('passport');

const asyncMiddleware = require('../../utils/asyncMiddleware');

const Todo = require('../../models/Todo');
const Profile = require('../../models/Profile');
const Yacht = require('../../models/Yacht');
const Service = require('../../models/Service');
const validateTodo = require('../../validation/todo');

// @route   GET api/todos
// @des     Get all todos
// @access  Privarte
router.get('/', (req, res) => {
  const errors = {};

  Todo.find()
    .then((todos) => {
      if (!todos) {
        errors.notodos = 'There are no todos';
        return res.status(404).json(errors);
      }

      return res.status(200).json(todos);
    })
    .catch((err) => {
      err.msg = { todos: 'There are no todos' }; // eslint-disable-line no-param-reassign
      return res.status(404).json(err.msg);
    });
});

// @route   GET api/todos/yacht/:yachtprofile_id
// @des     Get all todos for one yacht
// @access  Private
router.get(
  '/yacht/:yachtprofile_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Todo.find({ yacht: req.params.yachtprofile_id })
      .then((todos) => {
        if (!todos) {
          errors.notodos = 'There are no todos for this yacht';
          return res.status(404).json(errors);
        }

        return res.status(200).json(todos);
      })
      .catch((err) => {
        err.msg = { todos: 'There are no todos for this yacht' }; // eslint-disable-line no-param-reassign
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/todos/user/:userProfile_id
// @des     Get all todos for one user
// @access  Private
router.get(
  '/user/:userProfile_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Todo.find({ asignee: req.params.userProfile_id })
      .then((todos) => {
        if (!todos) {
          errors.notodos = 'There are no todos for this user';
          return res.status(404).json(errors);
        }

        return res.status(200).json(todos);
      })
      .catch((err) => {
        err.msg = { todos: 'There are no todos for this user' }; // eslint-disable-line no-param-reassign
        return res.status(404).json(err.msg);
      });
  }
);

// @route   POST api/todo/user/:profileId/:yachtId/:serviceId
// @des     Create a todo
// @access  Private
router.post(
  '/user/:profileId/:yachtId?/:serviceId?',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { errors, isValid } = validateTodo(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    let yacht;
    let service;
    const todoFields = {};
    todoFields.createdby = req.user.id;
    const profile = await Profile.findById(req.params.profileId);
    todoFields.assignee = profile;
    todoFields.assignedTo = profile.handle
      ? profile.handle
      : `${profile.firstname} ${profile.lastname}`;
    if (req.params.yachtId) {
      yacht = await Yacht.findById(req.params.yachtId);
      todoFields.yacht = yacht;
    }
    if (req.params.serviceId) {
      service = await Service.findById(req.params.serviceId);
      todoFields.service = service;
    }
    if (req.body.dateCreated) todoFields.dateCreated = req.body.dateCreated;
    if (req.body.dateDue) todoFields.dateDue = req.body.dateDue;
    if (req.body.isCompleted) todoFields.isCompleted = req.body.isCompleted;
    if (req.body.content) todoFields.content = req.body.content;
    const newTodo = new Todo(req.body);

    // save the service to services collection
    await newTodo.save();
    // Add service to the yacht's services array
    if (req.params.yachtId) {
      yacht.todos.push(newTodo);
      await yacht.save();
    }

    return res.status(201).json(newTodo);
  })
);

// @route   DELETE api/todos/todo/:todo_id
// @des     Delete todo item
// @access  Private
router.delete(
  '/todo/:todo_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Todo.findById(req.params.todo_id)
      .deleteOne({ _id: req.params.todo_id })
      .exec()
      .then(() => res.json({ success: true }));
  }
);

module.exports = router;
