const express = require('express')
const Post = require('../models/post')
const authorization = require('../middleware/authorization')
const { validateUpdate } = require('../middleware/postValidation')
const router = new express.Router()

// Route to update a post
router.patch('/updatePost/:id', authorization, validateUpdate, async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    if (!post) {
      return response.status(400).send({
        error: "Invalid post Id."
      })
    }
    const updates = Object.keys(request.body)
    updates.forEach((update) => {
      post[update] = request.body[update]
    })

    await post.save()
    response.status(200).send()
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})


module.exports = router