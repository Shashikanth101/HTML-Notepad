// dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User.js')
const { ACCESS_TOKEN_SECRET } = require('../../config/keys.js')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    // If user already exists
    if (await User.exists({ email })) {
      res.status(400).json({ 'message': 'User already exists' })
    } else {
      // encrypt user password
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ name, email, password: hashedPassword })
      res.status(201).json({ 'message': 'Registration Successfull' })
    }
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    // check if user exists
    const user = await User.findOne({ email })
    if (user === null) return res.status(404).json({ 'message': 'Account does not exist' })
    else {
      // Validate entered password
      if (await bcrypt.compare(password, user.password)) {
        // On successfull Authentication

        // Access Token: Grants access to account resources
        const userPayload = { userID: user._id }
        const token = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: '20d' })

        const expirationDate = 10*24*60*60*1000
        // Set ACCESS_TOKEN in a cookie (expires in 5 hrs)
        res.cookie('token', token, { expires: new Date(Date.now + expirationDate), httpOnly: true })
        res.cookie('loggedIn', 'YES', { path: '/', expires: new Date(Date.now + expirationDate), httpOnly: true })
        res.status(200).json({ 'message': 'Authentication Successfull' })
      } else {
        // Incorrect Password
        res.status(400).json({ 'message': 'Incorrect password' })
      }
    }
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

router.get('/logout', (req, res) => {
  // Access Token gets stored in a cookie upon login
  // Upon Logout, this cookie has to be deleted 
  res.clearCookie('token')
  res.clearCookie('loggedIn')
  res.status(201).json({ 'message': 'Successfully logged out' })
})

module.exports = router