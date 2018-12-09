const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const yachtProfileSchema = new Schema({
  yacht: {
    type: Schema.Types.ObjectId,
    ref: 'Yacht',
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  currentclient: {
    type: Boolean,
    required: true,
  },
  loa: {
    type: String,
  },
  draft: {
    type: String,
  },
  beam: {
    type: String,
  },
  cruisinglicense: {
    type: Number,
  },
  taxid: {
    type: String,
  },
  owningcompany: {
    type: String,
  },
  owningcompanyaddress: {
    type: String,
  },
  buildcompany: {
    type: String,
  },
  buildyear: {
    type: String,
  },
  refityear: {
    type: String,
  },
  captain: {
    type: Schema.Types.ObjectId,
    ref: 'Captain',
  },
},
{
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

yachtProfileSchema.virtual('services', {
  ref: 'Service',
  localField: '_id',
  foreignField: 'yachtprofile',
});

module.exports = mongoose.model('YachtProfile', yachtProfileSchema);
