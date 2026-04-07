require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors({ origin: '*', credentials: false }))
app.use(express.json())

// Routes
app.use('/api/auth',   require('./routes/auth'))
app.use('/api/users',  require('./routes/users'))
app.use('/api/leaves', require('./routes/leaves'))

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set')
  process.exit(1)
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => { console.error('DB connection failed:', err.message); process.exit(1) })
