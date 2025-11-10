const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.get('/', (req, res) => res.json({ ok: true, message: 'StudyMate API running' }))

// mount routes (added in later commits)
app.use('/api/partners', require('./routes/partnerRoutes'))
app.use('/api/requests', require('./routes/requestRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
