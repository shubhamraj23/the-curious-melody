const express = require('express')
const Post = require('../models/post')
const router = new express.Router()

router.get('/', (request, response) => {
  response.send('Yo!')
})


module.exports = router