const mongoose = require('mongoose')

// Creating schema for the feedback model
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  feedback: {
    type: String,
    trim: true,
    required: true
  },
  visibility: {
    type: Boolean,
    default: true
  },
  anonymity: {
    type: Boolean,
    default: false
  },
  linkID: {
    type: mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true
})

const Feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = Feedback