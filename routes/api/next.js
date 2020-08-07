// dependencies
const express = require('express')
const Note = require('../../models/Note.js')
const authNextMiddleware = require('../../middlewares/authenticateNextRequest.js')

const router = express.Router()
router.use(authNextMiddleware)

// GET note
router.get('/note/:noteID', async (req, res) => {
  const { userID } = req.userPayload
  const { noteID } = req.params
  try {
    // Check if the requested document exists and also belongs to the requesting user 
    const note = await Note.findById(noteID)
    if (note === null) return res.status(404).json({ 'message': 'Not found' })
    if (note.authorID !== userID) res.status(401).json({ 'message': 'Unauthorized' })

    // Send the requested document
    else res.status(200).json(note)
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

module.exports = router