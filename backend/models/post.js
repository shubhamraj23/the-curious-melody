const mongoose = require('mongoose')
const {postTypes, languages} = require('../customization')

// Creating schema for the Post model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    trim: true,
    validate(value) {
      if (!postTypes.includes(value)) {
        throw new Error('Invalid type of post.')
      }
    }
  },
  language: {
    type: String,
    trim: true,
    validate(value) {
      if (!languages.includes(value)) {
        throw new Error('This language is not currently supported.')
      }
    }
  },
  tags: [{
    type: String
  }],
  collectionID: {
    type: mongoose.Schema.Types.ObjectId,
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post