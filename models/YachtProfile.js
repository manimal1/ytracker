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
  active: {
    type: Boolean,
    required: true,
  },
  cruisinglicense: {
    type: Number,
  },
  taxid: {
    type: String,
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
  localField: 'services',
  foreignField: 'yachtprofile',
});

module.exports = mongoose.model('YachtProfile', yachtProfileSchema);
