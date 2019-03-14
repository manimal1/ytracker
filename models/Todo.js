const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  yacht: {
    type: Schema.Types.ObjectId,
    ref: 'Yacht'
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  assignedTo: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateDue: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    required: true
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('Todo', todoSchema);
