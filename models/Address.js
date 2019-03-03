const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const addressSchema = new Schema({
  addressline1: {
    type: String,
  },
  addressline2: {
    type: String,
  },
  city: {
    type: String,
  },
  postalcode: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = mongoose.model('Address', addressSchema);
