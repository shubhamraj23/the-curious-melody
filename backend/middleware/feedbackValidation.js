const Filter = require('bad-words')
const { feedbackAllowedUpdates, removeBadFilter } = require('../customization')

const filter = new Filter()
filter.removeWords(...removeBadFilter)

// Check if the feedback contains any profane words
const checkProfane = (request, response, next) => {
  if (request.body.feedback && filter.isProfane(request.body.feedback)){
    return response.status(400).send({
      error: "Profanity is not allowed."
    })
  }
  next()
}

// Check if the length of feedback is more than 10 characters.
const checkLength = (request, response, next) => {
  const feedback = request.body.feedback
  if (!feedback || feedback.length < 10){
    return response.status(400).send({
      error: 'Feedback must be atleast 10 characters long.'
    })
  }
  next()
}

// Check if the contents of the provided update operation are valid
const validateFeedbackUpdate = async (request, response, next) => {
  const updates = Object.keys(request.body)
  const isValid = updates.every((update) => feedbackAllowedUpdates.includes(update))
  if (!isValid){
    return response.status(400).send({
      error: "Invalid updates"
    })
  }
  if (updates.includes('feedback')){
    checkLength(request, response, next)
  }
  else{
    next()
  }
}

module.exports = {
  checkProfane,
  checkLength,
  validateFeedbackUpdate,
}