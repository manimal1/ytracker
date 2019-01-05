const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = require('./Address').schema;

// Create Schema
const companySchema = new Schema({
  companyname: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  servicetype: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  mobile: {
    type: Number,
  },
  address: addressSchema,
});

module.exports = mongoose.model('Company', companySchema);
