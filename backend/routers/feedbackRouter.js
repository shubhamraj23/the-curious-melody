const express = require('express')
const Feedback = require('../models/feedback')
const Post = require('../models/post')
const Collection = require('../models/collection')
const authentication = require('../middleware/authorization')
const { checkProfane, checkLength, validateFeedbackUpdate } = require('../middleware/feedbackValidation')
const router = new express.Router()

// Router to create a new feedback
router.post('/feedback/:id', checkProfane, checkLength, async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    const collection = await Collection.findById(request.params.id)
    if (!post && !collection){
      return response.status(400).send({
        error: "Invalid Id."
      })
    }

    const feedback = new Feedback({
      ...request.body,
      linkID: request.params.id
    })
    await feedback.save()
    response.status(201).send(feedback._id)

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to delete a feedback
router.delete('/feedback/:id', authentication, async (request, response) => {
  try {
    const feedback = await Feedback.findById(request.params.id)
    if (!feedback) {
      return response.status(400).send({
        error: 'Invalid Feedback Id.'
      })
    }
    await feedback.remove()
    response.status(200).send()

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Router to edit a feedback
router.patch('/feedback/:id', authentication, checkProfane, validateFeedbackUpdate, async (request, response) => {
  try {
    const feedback = await Feedback.findById(request.params.id)
    if (!feedback) {
      return response.status(400).send({
        error: "Invalid Post Id."
      })
    }
    const updates = Object.keys(request.body)
    updates.forEach((update) => {
      feedback[update] = request.body[update]
    })

    await feedback.save()
    response.status(200).send()

  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

module.exports = router