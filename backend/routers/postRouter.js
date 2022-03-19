const express = require('express')
const Post = require('../models/post')
const authorization = require('../middleware/authorization')
const { validateCreation } = require('../middleware/postValidation')
const router = new express.Router()

router.post('/post', authorization, validateCreation, async (request, response) => {
  try {
    const post = new Post(request.body)
    await post.save()
    response.status(201).send(post._id)
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

module.exports = router