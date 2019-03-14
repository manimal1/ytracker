const express = require('express');

const router = express.Router();
const passport = require('passport');

const asyncMiddleware = require('../../utils/asyncMiddleware');

const Todo = require('../../models/Todo');
const Profile = require('../../models/Profile');
const Yacht = require('../../models/Yacht');
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

// @route   GET api/todos/:todoId
// @des     Get todo by ID
// @access  Privarte
router.get('/:todoId', (req, res) => {
  const errors = {};

  Todo.findById(req.params.todoId)
    .then((todo) => {
      if (!todo) {
        errors.notodofound = 'This todo does not exist';
        return res.status(404).json(errors);
      }

      return res.status(200).json(todo);
    })
    .catch((err) => {
      err.msg = { todos: 'Selected Todo does not exist' }; // eslint-disable-line no-param-reassign
      return res.status(404).json(err.msg);
    });
});

// @route   GET api/todos/active
// @des     Get all active todos
// @access  Private
router.get(
  '/active',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const errors = {};
    const todos = await Todo.find();
    if (!todos) {
      errors.notodos = 'There are no todos';
      return res.status(404).json(errors);
    }

    const activeTodos = todos.filter(todo => !todo.isCompleted);
    if (!activeTodos) {
      errors.noactivetodos = 'There are no active todos';
      return res.status(404).json(errors);
    }

    return res.status(200).json(activeTodos);
  })
);

// @route   GET api/todos/yacht/:yachtprofileId
// @des     Get all todos for one yacht
// @access  Private
router.get(
  '/yacht/:yachtId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Yacht.findById(req.params.yachtId)
      .then((yacht) => {
        if (!yacht.todos) {
          errors.notodos = 'There are no todos for this yacht';
          return res.status(404).json(errors);
        }

        return res.status(200).json(yacht.todos);
      })
      .catch((err) => {
        err.msg = { todos: 'There are no todos for this yacht' }; // eslint-disable-line no-param-reassign
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/todos/yacht/active/:yachtprofileId
// @des     Get all active todos for one yacht
// @access  Private
router.get(
  '/yacht/active/:yachtprofileId',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const errors = {};
    const yacht = Yacht.findById(req.params.yachtprofileId);
    if (!yacht.todos) {
      errors.notodos = 'There are no todos for this yacht';
      return res.status(404).json(errors);
    }
    const { todos } = yacht;
    const yachtTodos = todos.map(todoId => Todo.findById(todoId));
    const activeTodos = yachtTodos.filter(yachtTodo => !yachtTodo.isCompleted);
    return res.status(200).json(activeTodos);
  })
);

// @route   GET api/todos/user/:userProfileId
// @des     Get all todos for one user
// @access  Private
router.get(
  '/user/:userProfileId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findById(req.params.userProfileId)
      .then((profile) => {
        if (!profile.todos) {
          errors.notodos = 'There are no todos for this user';
          return res.status(404).json(errors);
        }

        return res.status(200).json(profile.todos);
      })
      .catch((err) => {
        err.msg = { todos: 'There are no todos for this user' }; // eslint-disable-line no-param-reassign
        return res.status(404).json(err.msg);
      });
  }
);

// @route   GET api/todos/user/active/:userProfileId
// @des     Get all active todos for one user
// @access  Private
router.get(
  '/user/active/:userProfileId',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const errors = {};
    const profile = Profile.findById(req.params.userProfileId);
    if (!profile.todos) {
      errors.notodos = 'There are no todos for this user';
      return res.status(404).json(errors);
    }
    const { todos } = profile;
    const userTodos = todos.map(todoId => Todo.findById(todoId));
    const activeTodos = userTodos.filter(userTodo => !userTodo.isCompleted);
    return res.status(200).json(activeTodos);
  })
);

// @route   POST api/todos/user/:profileId/:yachtId
// @des     Create a todo
// @access  Private
router.post(
  '/user/:profileId/:yachtId?',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { errors, isValid } = validateTodo(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    let yacht;
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

// @route   DELETE api/todos/todo/:todoId
// @des     Delete todo item
// @access  Private
router.delete(
  '/todo/:todoId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Todo.findById(req.params.todoId)
      .deleteOne({ _id: req.params.todoId })
      .exec()
      .then(() => res.json({ success: true }));
  }
);

module.exports = router;
