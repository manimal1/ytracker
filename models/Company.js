const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = require('./Address').schema;

// Create Schema
const companySchema = new Schema({
  name: {
    type: String,
    required: true,
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
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service',
  }],
});

module.exports = mongoose.model('Company', companySchema);
