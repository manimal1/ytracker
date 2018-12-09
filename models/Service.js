const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  yachtprofile: {
    type: Schema.Types.ObjectId,
    ref: 'YachtProfile',
  },
  cost: {
    type: Number,
    required: true,
  },
  charged: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
