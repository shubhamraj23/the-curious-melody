const Post = require('../models/post')
const { mandatoryTitle, mandatoryDescription, allowedPostUpdates } = require('../customization')

const validateCreation = (request, response, next) => {
  const { type, title, description, language } = request.body

  if (!(language && type)){
    return response.status(400).send({
      error: `Language and Type field are mandatory.`
    })
  }
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

const validateUpdate = async (request, response, next) => {
  const updates = Object.keys(request.body)
  const isValidOperation = updates.every((update) => {
    return allowedPostUpdates.includes(update)
  })
  if (!isValidOperation) {
    return response.status(400).send({
      error: "Invalid updates"
    })
  }
  next()
}

module.exports = {
  validateCreation,
  validateUpdate
}