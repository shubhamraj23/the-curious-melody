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
    required: true,
    trim: true,
    validate(value) {
      if (!postTypes.includes(value)) {
        throw new Error('Invalid type of post.')
      }
    }
  },
  language: {
    type: String,
    required: true,
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
  parent: {
    type: mongoose.Schema.Types.ObjectId
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  siblings: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  siblingNumber: {
    type: Number,
    validate(value) {
      if (value <= 0) {
        throw new Error('Sibling count must start from 1.')
      }
    }
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post