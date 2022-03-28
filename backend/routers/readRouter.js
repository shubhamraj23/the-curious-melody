const express = require('express')
const Post = require('../models/post')
const Collection = require('../models/collection')
const router = new express.Router()

// Router to read a post
router.get('/post/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    if (!post) {
      response.status(400).send({
        error: "Invalid Post Id."
      })
    }
    response.status(200).send(post)

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to read all posts in a collection
router.get('/collection/:id', async (request, response) => {
  try {
    const collection = await Collection.findById(request.params.id)
    if (!collection) {
      response.status(400).send({
        error: "Invalid Post Id."
      })
    }

    const collectionPosts = {}
    if (collection.parent) {
      collectionPosts.parent = await Post.findById(collection.parent)
    }

    const childPromise = collection.children.map(async (child) => {
      const post = await Post.findById(child)
      return post
    })
    collectionPosts.children = await Promise.all(childPromise)
    response.status(200).send(collectionPosts)

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

module.exports = router