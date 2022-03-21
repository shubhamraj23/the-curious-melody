const mongoose = require('mongoose')

// Creating the schema for the collection model
const collectionSchema = mongoose.Schema({
  parent: {
    type: mongoose.Schema.Types.ObjectId
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true
})

const Collection = mongoose.model('Collection', collectionSchema)
module.exports = Collection