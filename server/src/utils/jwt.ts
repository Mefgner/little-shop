import jwt from 'jsonwebtoken'
import { IMinimalUser } from '@/user/user.dto'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string

export function signTokens(user: IMinimalUser): { accessToken: string; refreshToken: string } {
  const signData = { email: user.email, id: user.id }
  const accessToken = jwt.sign(signData, JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  })
  const refreshToken = jwt.sign(signData, JWT_ACCESS_SECRET, {
    expiresIn: '2w',
  })

  return { accessToken, refreshToken }
}

export function refreshAccessToken(refreshToken: string): string {
  const decoded = jwt.decode(refreshToken)
  if (!decoded) {
    throw new Error('Invalid token')
  }
  return jwt.sign({ email: (decoded as any).email, id: (decoded as any).id }, JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  })
}

export function verifyToken(token: string): unknown | object {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET)
  } catch (error) {
    return null
  }
}

export function decryptToken(token: string): unknown | JSON {
  return jwt.decode(token)
}
