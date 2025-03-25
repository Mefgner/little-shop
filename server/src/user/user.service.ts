import { PrismaClient, User } from '@prisma/client'
import { IMinimalUser } from './user.dto'
import { signTokens, refreshAccessToken, decryptToken } from '@/utils/jwt'
import { compare, hashSync } from 'bcryptjs'

export class UserService {
  private prisma = new PrismaClient()

  private hashPassword(password: string): string {
    return hashSync(password, 10)
  }

  private isUserValid(user: IMinimalUser): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(user.email)) {
      throw new Error('Email is invalid')
    }
    if (user.password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }
    return true
  }

  createUser(user: IMinimalUser): Promise<User> | undefined {
    if (!user.password || !user.email || !user.name) {
      throw new Error('Invalid registration data')
    }

    user.password = this.hashPassword(user.password)
    if (this.isUserValid(user)) {
      return this.prisma.user.create({ data: user })
    }
  }

  updateUser(id: number, user: User): Promise<User> | undefined {
    if (this.isUserValid(user)) {
      user.password = this.hashPassword(user.password)
      return this.prisma.user.update({ where: { id }, data: user })
    }
  }

  async getUserById(id: number): Promise<Omit<User, 'password'> | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        deliveryAddress: true,
        deliveryCity: true,
        deliveryZipCode: true,
        deliveryCountry: true,
        phone: true,
        privileges: true,
      },
    })
  }

  async generateToken(user: IMinimalUser): Promise<{ accessToken: string; refreshToken: string }> {
    return signTokens(user)
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    return refreshAccessToken(refreshToken)
  }

  async decryptToken(token: string): Promise<IMinimalUser> {
    return decryptToken(token) as IMinimalUser
  }

  async getUserByEmailAndPass(email: string, password: string): Promise<IMinimalUser | null> {
    console.log(email, password)
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (user && (await compare(password, user.password))) {
      return user
    }
    return null
  }
}
