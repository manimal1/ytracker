const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = require('./Address').schema;

// Create Schema
const yachtSchema = new Schema({
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    required: true,
  },
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
  cruisinglicense: {
    type: String,
  },
  taxid: {
    type: String,
  },
  billingcompany: {
    companyname: {
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
  },
  owningcompany: {
    companyname: {
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
  },
  managementcompany: {
    companyname: {
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
  },
});
// {
//   toObject: {
//     virtuals: true,
//   },
//   toJSON: {
//     virtuals: true,
//   },
// });

// yachtSchema.virtual('services', {
//   ref: 'Service',
//   localField: 'services',
//   foreignField: 'yacht',
// });


module.exports = mongoose.model('Yacht', yachtSchema);
