// Load all the environment variables
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// Load all the required native and NPM modules
const express = require('express')

// Load all the required files
const adminRouter = require('./routers/adminRouter')
const createRouter = require('./routers/createRouter')
const updateRouter = require('./routers/updateRouter')
const deleteRouter = require('./routers/deleteRouter')

// Set up MongoDB connection
require('./mongoose')

// Create app instance
const app = express()
app.use(express.json()) // Converts the request headers into JSON

// Use all the different routers set up
app.use(adminRouter)
app.use(createRouter)
app.use(updateRouter)
app.use(deleteRouter)

// Run the server to listen on the specified port
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})