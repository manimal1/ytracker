const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const captainSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: Number,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('Captain', captainSchema);
