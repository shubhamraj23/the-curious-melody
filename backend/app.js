// Load all the environment variables
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// Load all the required native and NPM modules
const express = require('express')

// Load all the required files

// Set up MongoDB connection
require('./mongoose')

const app = express()
const port = process.env.PORT

app.get('/', (request, response) => {
  response.send('Hi')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})