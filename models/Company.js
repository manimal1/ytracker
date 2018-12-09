const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const companySchema = new Schema({
  servicetype: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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

module.exports = mongoose.model('Company', companySchema);
