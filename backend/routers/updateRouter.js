const express = require('express')
const Post = require('../models/post')
const Collection = require('../models/collection')
const authentication = require('../middleware/authorization')
const { validateUpdate } = require('../middleware/postValidation')
const router = new express.Router()

// Route to update a post
router.patch('/updatePost/:id', authentication, validateUpdate, async (request, response) => {
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

// Router to link a post to the end of a collection
router.patch('/linkToCollection/:postId/:collectionId', authentication, async (request, response, next) => {
  try {
    // Check if IDs are valid or not
    const post = await Post.findById(request.params.postId)
    const collection = await Collection.findById(request.params.collectionId)
    if (!post || !collection) {
      return response.status(400).send({
        error: "Invalid Id sent."
      })
    }

    if (post.collectionID) {
      return response.status(400).send({
        error: "This post is already part of a collection."
      })
    }

    collection.children.push(post._id)
    post.collectionID = collection._id
    await post.save()
    await collection.save()
    response.status(200).send()

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to unlink a post from a collection.
router.patch('/unlinkFromCollection/:postId', authentication, async (request, response) => {
  try {
    const post = await Post.findById(request.params.postId)
    if (!post){
      return response.status(400).send({
        error: "Invalid Id."
      })
    }

    if (!post.collectionID){
      return response.status(400).send({
        error: "Post is not a part of any collection."
      })
    }
    
    const collection = await Collection.findById(post.collectionID)
    post.collectionID = undefined
    await post.save()
    if (!collection){
      return response.status(200).send()
    }

    if (collection.parent && collection.parent.equals(post._id)){
      collection.parent = undefined
      await collection.save()
      return response.status(200).send()
    }

    collection.children = collection.children.filter((child) => !child.equals(post._id))
    await collection.save()
    response.status(200).send()

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to convert a collection into individual posts.
// This router removes the collection and the parent post.
router.patch('/individualPosts/:collectionId', authentication, async (request, response) => {
  try {
    const collection = await Collection.findById(request.params.collectionId)
    if (!collection) {
      return response.status(400).send({
        error: "Invalid collection Id."
      })
    }

    if (collection.parent) {
      await Post.findByIdAndDelete(collection.parent)
    }

    collection.children.forEach((child) => removeCollection(child))
    await collection.remove()
    response.status(200).send()

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to reorder posts in a collection
router.patch('/reorderPosts/:collectionId', authentication, async (request, response) => {
  try{
    const collection = await Collection.findById(request.params.collectionId)
    if (!collection) {
      return response.status(400).send({
        error: "Invalid collection Id."
      })
    }

    if (!request.body.children) {
      return response.status(400).send({
        error: "Invalid updates."
      })
    }

    const children = request.body.children
    const childrenSet = [...new Set(children)]
    if ((childrenSet.length !== children.length) || (collection.children.length !== children.length)) {
      return response.status(400).send({
        error: "Invalid updates."
      })
    }

    // Check if all the provided ids are present in the collection or not.
    const isValid = children.every((child) => {
      return collection.children.some((collectionChild) => collectionChild.equals(child))
    })
    if (!isValid) {
      return response.status(400).send({
        error: "Invalid updates."
      })
    }

    collection.children = children
    await collection.save()
    response.status(200).send()

  } catch(e) {
    console.log(e)
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Helper functions
const removeCollection = async (id) => {
  const post = await Post.findById(id)
  post.collectionID = undefined
  await post.save()
}

module.exports = router