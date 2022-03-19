const jwt = require('jsonwebtoken')
const Token = require('../models/tokens')

const authorization = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET)
    const availableToken = await Token.findOne({ token })
    if (!availableToken) {
      return response.status(400).send({
        error: "Unauthenticated Access."
      })
    }
    request.token = token
    next()
  } catch (e) {
    response.status(400).send({
      error: "Unauthenticated Access."
    })
  }
}

module.exports = authorization