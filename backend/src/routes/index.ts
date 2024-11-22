import { Express } from 'express'
import authRoutes from './auth.routes'
import locationRoutes from './location.routes'
import reviewRoutes from './review.routes'
import postRoutes from './post.routes'
import keywordRoutes from './keyword.routes'
import teamRoutes from './team.routes'
import reportRoutes from './report.routes'
import analyticsRoutes from './analytics.routes'

export function setupRoutes(app: Express) {
  app.use('/api/auth', authRoutes)
  app.use('/api/locations', locationRoutes)
  app.use('/api/reviews', reviewRoutes)
  app.use('/api/posts', postRoutes)
  app.use('/api/keywords', keywordRoutes)
  app.use('/api/team', teamRoutes)
  app.use('/api/reports', reportRoutes)
  app.use('/api/analytics', analyticsRoutes)
}