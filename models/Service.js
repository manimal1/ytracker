const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  yacht: {
    type: Schema.Types.ObjectId,
    ref: 'Yacht',
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cost: {
    type: Number,
  },
  charged: {
    type: Number,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
