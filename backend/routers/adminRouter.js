const express = require('express')
const jwt = require('jsonwebtoken')
const Token = require('../models/tokens')
const authentication = require('../middleware/authorization')
const router = new express.Router()

const adminUser = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}

// Login route
router.post('/admin/login', async (request, response) => {
  if (!(JSON.stringify(adminUser) === JSON.stringify(request.body))) {
    return response.status(400).send({
      error: "Invalid credentials"
    })
  }
  try {
    const generatedToken = await jwt.sign({ adminUser }, process.env.JWT_SECRET, {expiresIn: '3h'})
    const token = new Token({token: generatedToken})
    await token.save()
    response.status(200).send(token)
  } catch (e) {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Logout current session route
router.post('/admin/logout', authentication, async (request, response) => {
  try {
    await Token.deleteOne({ token: request.token })
    response.status(200).send()
  }
  catch {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

// Logout all session routes
router.post('/admin/logoutAll', authentication, async (request, response) => {
  try {
    await Token.deleteMany({})
    response.status(200).send()
  }
  catch {
    response.status(500).send({
      error: "Something unprecendented happened. Please try again."
    })
  }
})

module.exports = router