const Post = require('../models/post')
const { mandatoryTitle, mandatoryDescription } = require('../customization')

const validateCreation = (request, response, next) => {
  const { type, title, description } = request.body

  if (mandatoryTitle.includes(type) && !title){
    return response.status(400).send({
      error: `A title is mandatory for ${type}.`
    })
  }
  if (mandatoryDescription.includes(type) && !description){
    return response.status(400).send({
      error: `A description is mandatory for ${type}.`
    })
  }
  next()
}

const validateType = async (request, response, next) => {
  const { type } = request.body
  const post = await Post.findById(request.params.id)
  if (!post) {
    return response.status(400).send({
      error: "Invalid post Id."
    })
  }
  if (type !== post.type) {
    return response.status(400).send({
      error: "The content type must be the same."
    })
  }
  request.queryPost = post
  next()
}

module.exports = {
  validateCreation,
  validateType
}