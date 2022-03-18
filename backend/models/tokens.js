const mongoose = require('mongoose')

// Creating Schema for admin tokens
const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
})

const Token = mongoose.model('Token', tokenSchema)
module.exports = Token