const express = require('express')
const Post = require('../models/post')
const Collection = require('../models/collection')
const authentication = require('../middleware/authorization')
const { validateCreation, validateParent } = require('../middleware/postValidation')
const router = new express.Router()

// Route to create a new post
router.post('/createPost', authentication, validateCreation, async (request, response) => {
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
router.post('/createCollection', authentication, async (request, response) => {
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
router.post('/createCollectionWithParent', authentication, validateParent, async (request, response) => {
  try {
    const collection = new Collection({})
    const post = new Post(request.body)
    post.collectionID = collection._id
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
router.post('/createPost/:id', authentication, validateCreation, async (request, response) => {
  try {
    const collection = await Collection.findById(request.params.id)
    if (!collection) {
      return response.status(400).send({
        error: "Invalid Collection Id"
      })
    }

    const post = new Post(request.body)
    post.collectionID = request.params.id
    collection.children.push(post._id)
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