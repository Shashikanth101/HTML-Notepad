// dependencies
require('dotenv').config()
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// setup
const PORT = process.env.PORT || 3000
const { DB_URI } = require('./config/keys.js')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// connect to mongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to database...'))
.catch(err => console.log(err))

// Serve Next.js with express.js
app.prepare()
.then(() => {
  const server = express()

  // configure server
  server.use(express.json())
  server.use(cookieParser())

  // Express API routes
  server.use('/api/auth', require('./routes/api/auth.js'))
  server.use('/api/user', require('./routes/api/user.js'))
  server.use('/api/note', require('./routes/api/note.js'))

  // Next.js server api routes
  server.use('/api/next', require('./routes/api/next.js'))

  // All non API routes will be hadled by next.js
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // Start server
  server.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server started on port ${PORT}...`)
  })
})