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

module.exports = {
  validateCreation
}