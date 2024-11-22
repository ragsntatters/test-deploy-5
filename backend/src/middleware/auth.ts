import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { prisma } from '../lib/prisma'
import { ApiError } from '../utils/errors'

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new ApiError('No token provided', 401)
    }

    const decoded = jwt.verify(token, config.jwt.secret) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      throw new ApiError('User not found', 401)
    }

    req.user = user
    next()
  } catch (error) {
    next(new ApiError('Invalid token', 401))
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError('Not authenticated', 401)
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError('Not authorized', 403)
    }

    next()
  }
}