// dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const Note = require('../../models/Note.js')
const User = require('../../models/User.js')
const authMiddleware = require('../../middlewares/authenticateRequest.js')

const router = express.Router()
router.use(authMiddleware)

// GET user's account
router.get('/', async (req, res) => {
  const { userID } = req.userPayload
  try {
    const user = await User.findById(userID).select('-password -date.modified').exec()
    if (user === null) res.status(404).json({ 'message': 'User not found' })
    else res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// UPDATE name
router.patch('/name', async (req, res) => {
  const { userID } = req.userPayload
  const { newName: name } = req.body
  try {
    const user = await User.findByIdAndUpdate(userID, { name })
    if (user === null) res.status(404).json({ 'message': 'User not found' })
    else res.status(201).json({ 'message': 'Name successfully updated' })
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// UPDATE password
router.patch('/password', async (req, res) => {
  const { userID } = req.userPayload
  const { oldPassword, newPassword } = req.body
  try {
    // GET the user
    const user = await User.findById(userID)

    // If old password is correct
    if (await bcrypt.compare(oldPassword, user.password)) {
      // encrypt new password
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update user's account
      await User.findByIdAndUpdate(userID, { password: hashedPassword })

      // Clear cookie which contains the old access token
      res.clearCookie('token')
      res.status(201).json({ 'message': 'Password successflly updated' })
    } else {
      res.status(400).json({ 'message': 'Your old password is incorrect' })
    }
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// DELETE account
router.post('/delete', async (req, res) => {
  const { userID } = req.userPayload
  const { password } = req.body
  try {
    // GET the user
    const user = await User.findById(userID)

    // If password is correct
    if (await bcrypt.compare(password, user.password)) {
      // Delete all the documents created by the user
      await Note.deleteMany({ authorID: userID })

      // Delete user's account
      await User.findByIdAndDelete(userID)

      // Clear cookie which contains access token
      res.clearCookie('token')
      res.status(201).json({ 'message': 'Account successfully deleted' })
    } else {
      res.status(400).json({ 'message': 'Your password is incorrect' })
    }
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

module.exports = router