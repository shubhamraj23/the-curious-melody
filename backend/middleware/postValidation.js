const Post = require('../models/post')
const Collection = require('../models/collection')
const { 
  categoryOne,
  categoryTwo,
  categoryOneMandatory,
  categoryTwoOnly,
  categoryOneAllowedUpdates,
  categoryTwoAllowedUpdates,
  parentMandatory,
  parentOnly,
  parentAllowedUpdates
} = require('../customization')

const validateContents = (body) => {
  if (!body.type) {
    return false
  }
  const fields = Object.keys(body)
  if (categoryOne.includes(body.type)) {
    return categoryOneMandatory.every((mandatoryField) => fields.includes(mandatoryField))
  }
  else if (categoryTwo.includes(body.type)) {
    return fields.every((field) => categoryTwoOnly.includes(field))
  }
  return false
}

const validateCreation = (request, response, next) => {
  const isContentValid = validateContents(request.body)
  if (!isContentValid){
    return response.status(400).send({
      error: `Submitted content is either invalid or incomplete.`
    })
  }
  next()
}

const validateParent = (request, response, next) => {
  const fields = Object.keys(request.body)
  const isContentComplete = parentMandatory.every((mandatoryField) => fields.includes(mandatoryField))
  const isContentValid = fields.every((field) => parentOnly.includes(field))
  if (!isContentValid || !isContentComplete){
    return response.status(400).send({
      error: `Submitted content is either invalid or incomplete.`
    })
  }
  next()
}

const validateUpdate = async (request, response, next) => {
  const post = await Post.findById(request.params.id)
  if (!post) {
    return response.status(400).send({
      error: "Invalid Post Id."
    })
  }

  const postType = post.type
  const updates = Object.keys(request.body)
  let isValidOperation = false
  const collection = await Collection.findById(post.collectionID)

  // If post is not in a collection or not a parent post check for updates
  if (!collection || !post._id.equals(collection.parent)) {
    if (categoryOne.includes(postType)) {
      isValidOperation = updates.every((update) => categoryOneAllowedUpdates.includes(update))
    }
    else if (categoryTwo.includes(postType)) {
      isValidOperation = updates.every((update) => categoryTwoAllowedUpdates.includes(update))
    }
  }
  // If post is in a collection and a parent post, check for parent updates
  else {
    isValidOperation = updates.every((update) => parentAllowedUpdates.includes(update))
  }
  
  if (!isValidOperation) {
    return response.status(400).send({
      error: "Invalid updates"
    })
  }
  next()
}

module.exports = {
  validateCreation,
  validateParent,
  validateUpdate
}