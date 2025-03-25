import { NextFunction, Request, Response } from 'express'
import { verifyToken } from './utils/jwt'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('authMiddleware')

  const token = req.headers.authorization?.split(' ')[1]

  if (!token || token === 'null' || token === '') {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const user = verifyToken(token)

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  next()
}
