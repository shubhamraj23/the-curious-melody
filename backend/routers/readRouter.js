const express = require('express')
const Post = require('../models/post')
const Collection = require('../models/collection')
const { postTypes } = require('../customization')
const router = new express.Router()

// Router to read a post
router.get('/post/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    if (!post) {
      return response.status(400).send({
        error: "Invalid Post Id."
      })
    }
    response.status(200).send(post)

  } catch (e) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Router to read all posts in a collection
router.get('/collection/:id', async (request, response) => {
  try {
    const collection = await Collection.findById(request.params.id)
    if (!collection) {
      return response.status(400).send({
        error: "Invalid Collection Id."
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
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Router to count the number of posts of a specific type.
router.get('/count/:type', async (request, response) => {
  try {
    const type = request.params.type
    if (!postTypes.includes(type)){
      return response.status(400).send({
        error: "Invalid Post type."
      })
    }

    const count = await Post.countDocuments({ type })
    response.status(200).send({ [type]:count })

  } catch (e) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Router to count the number of all types of posts.
router.get('/countAll', async (request, response) => {
  try {
    let count = {}
    for (const type of postTypes) {
      const result = await Post.countDocuments({ type })
      count = {...count, [type]:result}
    }
    response.status(200).send(count)

  } catch(e) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

module.exports = router