import { Response, Request, Router } from 'express'
import { UserService } from '@/user/user.service'
import type { IMinimalUser } from '@/user/user.dto'
import { authMiddleware } from '@/auth.middleware'

const userRouter = Router()
export default userRouter

const accessFromHeader = (req: Request): string => {
  return req.headers.authorization?.split(' ')[1] || ''
}
const refreshFromBody = (req: Request): string => {
  return req.body.refreshToken || ''
}
const accessTokenSettings = () => {
  return {
    expires: new Date(Date.now() + 1000 * 60 * 60),
  }
}
const refreshTokenSettings = () => {
  return {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }
}

const userService = new UserService()

userRouter.post('/auth-status', async (req: Request, res: Response) => {
  // body : {}
  // headers : { Cookies }
  // response : { isAuth: boolean }

  console.log('user /auth-status get')

  try {
    const responseData = {
      isAuth: !!accessFromHeader(req),
      couldBeRefreshed: !!refreshFromBody(req),
    }
    res.status(200).json(responseData)
  } catch (e) {
    res.status(403).json({ error: String(e) })
    console.error(e)
  }
})

userRouter.post('/register', async (req: Request, res: Response) => {
  // body : { email: string, password: string, name: string ... } (all fields from UserDto)
  // response : { id, name, email, ... }

  console.log('user / post')

  try {
    const user = await userService.createUser(req.body)
    if (!user) {
      res.status(400).json({ error: 'Invalid registration data' })
      return
    }
    const tokens = await userService.generateToken(user as IMinimalUser)
    res
      .status(201)
      .cookie('refreshToken', tokens.refreshToken, refreshTokenSettings())
      .cookie('accessToken', tokens.accessToken, accessTokenSettings())
      .json(user)
  } catch (e) {
    res.status(400).json({ error: String(e) })
    console.error(e)
  }
})

userRouter.post('/login', async (req: Request, res: Response) => {
  // body : { email: string, password: string }
  // response : COOKIES { accessToken: string, refreshToken: string }

  console.log('user /login post')

  try {
    const user = await userService.getUserByEmailAndPass(req.body.email, req.body.password)
    if (user) {
      const tokens = await userService.generateToken(user)
      res
        .status(200)
        .cookie('refreshToken', tokens.refreshToken, refreshTokenSettings())
        .cookie('accessToken', tokens.accessToken, accessTokenSettings())
        .json({ id: user.id, email: user.email })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (e) {
    res.status(400).json({ error: String(e) })
    console.error(e)
  }
})

userRouter.post('/logout', async (req: Request, res: Response) => {
  // body : {}
  // response : {}

  console.log('user /logout post')

  res.status(200).clearCookie('accessToken').clearCookie('refreshToken').json({})
})

userRouter.put('/update', authMiddleware, async (req: Request, res: Response) => {
  // body : { email: string, password: string, name: string ... } (all fields from UserDto)
  // response : { id, name, email, ... }

  console.log('user / put')

  try {
    const tokens = await userService.decryptToken(accessFromHeader(req))
    const user = await userService.updateUser(tokens.id, req.body)
    res.status(201).json(user)
  } catch (e) {
    res.status(400).json({ error: String(e) })
    console.error(e)
  }
})

userRouter.post('/refresh-access', async (req: Request, res: Response) => {
  // body : { refreshToken: string }
  // response : { accessToken }

  console.log('user /refresh-access post')

  try {
    const token = await userService.refreshAccessToken(refreshFromBody(req))
    res.status(200).cookie('accessToken', token, accessTokenSettings()).json({ accessToken: token })
  } catch (e) {
    res.status(400).json({ error: String(e) })
    console.error(e)
  }
})

userRouter.get('/user-info', authMiddleware, async (req: Request, res: Response) => {
  // body : {}
  // headers : { Cookies: <accessToken> }
  // response : { id, name, email, ... }

  console.log('user /user-info get')

  try {
    const tokens = await userService.decryptToken(accessFromHeader(req))
    const user = await userService.getUserById(tokens.id)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json({ error: String(e) })
    console.error(e)
  }
})
