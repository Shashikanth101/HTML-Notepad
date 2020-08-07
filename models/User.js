const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: {
    count: {
      type: Number,
      default: 0
    },
    list: {
      type: [String],
      default: []
    }
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User