const express = require('express')
const Post = require('../models/post')
const Collection = require('../models/collection')
const authorization = require('../middleware/authorization')
const { validateCreation } = require('../middleware/postValidation')
const router = new express.Router()

// Route to create a new post
router.post('/createPost', authorization, validateCreation, async (request, response) => {
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

// Router to create a new empty collection
router.post('/createCollection', authorization, async (request, response) => {
  try {
    const collection = new Collection()
    await collection.save()
    response.status(201).send(collection._id)
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to create a parent post in a new collection
router.post('/createCollectionWithParent', authorization, async (request, response) => {
  try {
    const collection = new Collection()
    const post = new Post(request.body)
    post.collectionId = collection._id
    collection.parent = post._id
    await collection.save()
    await post.save()
    response.status(201).send({
      collectionId: collection._id,
      postID: post._id
    })
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to create a post in an existing collection
router.post('/createPost/:id', authorization, validateCreation, async (request, response) => {
  try {
    const post = new Post(request.body)
    const collection = await Collection.findById(request.params.id)
    post.collectionId = request.params.id
    collection.children.append(post._id)
    await collection.save()
    await post.save()
    response.status(201).send(post._id)
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

module.exports = router