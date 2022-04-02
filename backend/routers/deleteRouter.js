const express = require('express')
const Post = require('../models/post')
const Collection = require('../models/collection')
const authentication = require('../middleware/authorization')
const router = new express.Router()

// Router to delete a post
router.delete('/post/:id', authentication, async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    if (!post) {
      return response.status(400).send({
        error: "Invalid Post Id."
      })
    }

    // If post is part of a collection, then update the collection.
    if (post.collectionID) {
      const collection = await Collection.findById(post.collectionID)
      if (collection.parent && collection.parent.equals(post._id)) {
        collection.parent = undefined
      }
      collection.children = collection.children.filter((child) => !child.equals(post._id))
      await collection.save()
    }

    await post.remove()
    response.status(200).send()

  } catch (e) {
    console.log(e)
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Router to delete a collection
router.delete('/collection/:id', authentication, async (request, response) => {
  try {
    const collection = await Collection.findById(request.params.id)
    if (!collection) {
      return response.status(400).send({
        error: "Invalid Collection Id."
      })
    }

    if (collection.parent) {
      await Post.findByIdAndDelete(collection.parent)
    }

    collection.children.forEach((child) => removePost(child))
    await collection.remove()
    response.status(200).send()

  } catch (e) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Helper functions
const removePost = async (id) => {
  await Post.findByIdAndDelete(id)
}

module.exports = router