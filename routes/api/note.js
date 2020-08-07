// dependencies
const express = require('express')
const Note = require('../../models/Note.js')
const User = require('../../models/User.js')
const authMiddleware = require('../../middlewares/authenticateRequest.js')

const router = express.Router()
router.use(authMiddleware)

// GET list of notes
router.get('/', async (req, res) => {
  const { userID: authorID } = req.userPayload
  try {
    const notes = await Note.find({ authorID })
    res.status(200).json(notes)
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// GET 1 specific note
router.get('/:noteID', async (req, res) => {
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

// Create new note
router.post('/', async (req, res) => {
  const { userID: authorID } = req.userPayload
  const { title } = req.body
  try {
    // Create new document entry in th edatabase
    const note = await Note.create({ title, authorID })

    // Update User's account
    await User.findByIdAndUpdate(authorID, {
      $inc: { 'notes.count': 1 },
      $push: { 'notes.list': note._id }
    })

    // Send success response
    res.status(201).json({ 'message': 'New document successfully created' })
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// Update existing note
router.patch('/:noteID', async (req, res) => {
  const { userID } = req.userPayload
  const { noteID } = req.params
  const { title, content } = req.body
  try {
    // Check if the requested document exists and also belongs to the requesting user 
    const note = await Note.findById(noteID)
    if (note === null) return res.status(404).json({ 'message': 'Not found' })
    if (note.authorID !== userID) return res.status(401).json({ 'message': 'Unauthorized' })

    // Update note
    const updatedNote = await Note.findByIdAndUpdate(noteID, { title, content, 'date.modified': Date.now() })

    // Send success response
    res.status(201).json(updatedNote)
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// Delete note
router.delete('/:noteID', async (req, res) => {
  const { userID } = req.userPayload
  const { noteID } = req.params
  try {
    // Check if the requested document exists and also belongs to the requesting user 
    const note = await Note.findById(noteID)
    if (note === null) return res.status(404).json({ 'message': 'Not found' })
    if (note.authorID !== userID) return res.status(401).json({ 'message': 'Unauthorized' })

    // Remove entry from the user's account
    await User.findByIdAndUpdate(userID, {
      $inc: { 'notes.count': -1 },
      $pull: { 'notes.list': noteID }
    })

    // Delete from the 'notes' collection
    await Note.findByIdAndDelete(noteID)

    // Send success response
    res.status(201).json({ 'message': 'Successfully deleted' })
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

// Delete all notes
router.delete('/', async (req, res) => {
  const { userID } = req.userPayload
  try {
    // Delete all notes
    await Note.deleteMany({ authorID: userID })

    // Update User's account
    await User.findByIdAndUpdate(userID, { 'notes.count': 0, 'notes.list': [] })

    // Send success response
    res.status(201).json({ 'message': 'Successfully deleted all documents' })
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  }
})

module.exports = router