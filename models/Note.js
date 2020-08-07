const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  authorID: {
    type: String,
    required: true
  },
  date: {
    created: {
      type: Date,
      default: Date.now
    },
    modified: {
      type: Date,
      default: Date.now
    }
  }
})

const Note = mongoose.model('Note', NoteSchema)
module.exports = Note