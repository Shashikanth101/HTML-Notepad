const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/keys.js')

const authMiddleware = (req, res, next) => {
  // Grab token from cookie
  const token = req.cookies['token']

  // If no token, deny access
  if (token === null || token === undefined) return res.status(401).json({ 'message': 'Unauthorized' })

  // If valid token, grant access
  try {
    const userPayload = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.userPayload = userPayload
    next()
  } catch (err) {
    res.status(400).json({ 'message': 'Access Token expired. Login again' })
  }
}

module.exports = authMiddleware