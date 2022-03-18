// This file sets up the MongoDB connection
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)