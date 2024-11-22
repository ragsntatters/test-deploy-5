import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config'
import { errorHandler } from './middleware/error'
import { setupRoutes } from './routes'
import { logger } from './utils/logger'

const app = express()

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Setup routes
setupRoutes(app)

// Error handling
app.use(errorHandler)

// Start server
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} in ${config.env} mode`)
})