const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = require('./Company').schema;

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
  phone: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  loa: {
    type: Number,
  },
  draft: {
    type: Number,
  },
  beam: {
    type: Number,
  },
  grosstonnage: {
    type: Number,
  },
  buildcompany: {
    type: String,
  },
  buildyear: {
    type: Number,
  },
  refityear: {
    type: Number,
  },
  billingcompany: companySchema,
  owningcompany: companySchema,
  managementcompany: companySchema,
});

module.exports = mongoose.model('Yacht', yachtSchema);
