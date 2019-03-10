const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  role: {
    type: String
  },
  location: {
    type: String
  },
  linkedin: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
  // bio: {
  //   type: String
  // },
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     },
  //     location: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       required: false
  //     },
  //     experience: {
  //       type: String
  //     }
  //   }
  // ],
  // education: [
  //   {
  //     school: {
  //       type: String,
  //       required: true
  //     },
  //     degree: {
  //       type: String,
  //       required: true
  //     },
  //     fieldofstudy: {
  //       type: String,
  //       required: true
  //     },
  //     description: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       required: false
  //     }
  //   }
  // ],
});

module.exports = mongoose.model('Profile', profileSchema);
