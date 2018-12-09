const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const yachtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  yachttype: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Yacht', yachtSchema);
