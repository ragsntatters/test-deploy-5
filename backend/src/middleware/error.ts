import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/errors'
import { logger } from '../utils/logger'

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(error)

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        ...(error.data && { data: error.data })
      }
    })
  }

  // Handle other types of errors
  res.status(500).json({
    error: {
      message: 'Internal server error'
    }
  })
}