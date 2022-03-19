const express = require('express')
const Post = require('../models/post')
const authorization = require('../middleware/authorization')
const { validateCreation, validateType } = require('../middleware/postValidation')
const router = new express.Router()

// Helper functions
const updateOldSiblings = async (sibling, id) => {
  const oldPost = await Post.findById(sibling)
  oldPost.siblings.push(id)
  await oldPost.save()
}

// Route to create a new post
router.post('/post', authorization, validateCreation, async (request, response) => {
  try {
    const post = new Post(request.body)
    post.siblingNumber = 1
    post.siblings = [post._id]
    await post.save()
    response.status(201).send(post._id)
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Route to create a sequel post
router.post('/postSequel/:id', authorization, validateCreation, validateType, async (request, response) => {
  try {
    // Get sibling details from last sibling
    let siblings = request.queryPost.siblings
    const lastSiblingId = siblings[siblings.length - 1]
    const lastSibling = await Post.findById(lastSiblingId)
    lastSiblingNumber = lastSibling.siblingNumber
    siblings = lastSibling.siblings
    
    // Create sequel
    const post = new Post({
      ...request.body,
      parent: request.queryPost.parent,
      siblings,
      siblingNumber: lastSiblingNumber + 1
    })

    // Update parent
    if (post.parent) {
      const parentPost = await Post.findById(post.parent)
      parentPost.children.push(post._id)
      await parentPost.save()
    }

    // Update all existing siblings
    post.siblings.forEach((sibling) => {
      updateOldSiblings(sibling, post._id)
    })
    post.siblings.push(post._id)

    await post.save()
    response.status(201).send(post._id)

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }  
})

// Route to create subpost
router.post('/postSubPost/:id', authorization, validateCreation, async (request, response) => {
  try {
    // Find the parent
    const parent = await Post.findById(request.params.id)
    if (!parent) {
      return response.status(400).send({
        error: "Invalid post Id."
      })
    }
    const siblings = parent.children
    let lastSiblingNumber = 0
    if (siblings.length !== 0){
      const lastSiblingId = siblings[siblings.length - 1]
      const lastSibling = await Post.findById(lastSiblingId)
      lastSiblingNumber = lastSibling.siblingNumber
    }
    
    // Create a subpost
    const post = new Post({
      ...request.body,
      parent: request.params.id,
      siblings,
      siblingNumber: lastSiblingNumber + 1
    })

    // Update the parent
    parent.children.push(post._id)
    await parent.save()

    // Update all existing siblings
    post.siblings.forEach((sibling) => {
      updateOldSiblings(sibling, post._id)
    })
    post.siblings.push(post._id)

    await post.save()
    response.status(201).send(post._id)

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

module.exports = router