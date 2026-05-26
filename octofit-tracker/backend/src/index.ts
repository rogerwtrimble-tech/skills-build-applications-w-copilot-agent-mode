import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit'
const PORT = Number(process.env.PORT || 8000)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB:', MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Octofit backend listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
