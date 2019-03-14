const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  yacht: {
    type: Schema.Types.ObjectId,
    ref: 'Yacht'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  todo: {
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  serviceType: {
    type: String
  },
  invoiceNumber: {
    type: String
  },
  costCurrency: {
    type: String
  },
  cost: {
    type: Number
  },
  isCostTaxAdded: {
    type: Boolean,
    default: false
  },
  isCostTaxIncluded: {
    type: Boolean,
    default: false
  },
  costTaxSelected: {
    type: Number,
    default: 0
  },
  costTax: {
    type: Number,
    default: 0.0
  },
  costTotal: {
    type: Number,
    default: 0.0
  },
  chargedCurrency: {
    type: String
  },
  charged: {
    type: Number,
    default: 0.0
  },
  isChargedTaxAdded: {
    type: Boolean,
    default: false
  },
  isChargedTaxIncluded: {
    type: Boolean,
    default: false
  },
  chargedTaxSelected: {
    type: Number,
    default: 0
  },
  chargedTaxPercentageOnTop: {
    type: Number,
    default: 0
  },
  chargedTax: {
    type: Number,
    default: 0.0
  },
  chargedTotal: {
    type: Number,
    default: 0.0
  }
});

module.exports = mongoose.model('Service', serviceSchema);
