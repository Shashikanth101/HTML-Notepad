const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/keys.js')

const authNextMiddleware = (req, res, next) => {
  // grab authorization headers
  const authHeader = req.headers['authorization'];

  // if authorization headers exists, grab access token from it
  const token = authHeader ? authHeader.split(' ')[1] : null;

  // if there is no authToken send 401
  if (token === null || token === undefined || authHeader === null) res.status(401).json({ 'message': 'Unauthorized access' });

  // If valid token, grant access
  try {
    const userPayload = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.userPayload = userPayload
    next()
  } catch (err) {
    res.status(400).json({ 'message': 'Access Token expired. Login again' })
  }
}

module.exports = authNextMiddleware