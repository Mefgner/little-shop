import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
import productRouter from '@/products/products.controller'
import userRouter from '@/user/user.controller'
import orderRouter, { stripeWebhookController } from '@/order/order.controller'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const prisma = new PrismaClient()
const app = express()

const staticFilesPath = path.join(__dirname, '../static')
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(','),
  credentials: true,
}

async function main() {
  app.use('/static', express.static(staticFilesPath))

  app.use('/api/orders/stripe-webhook', express.raw({ type: 'application/json' }), stripeWebhookController)

  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(corsOptions))

  app.use('/api/products', productRouter)
  app.use('/api/auth', userRouter)
  app.use('/api/orders', orderRouter)

  app.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
  })

  app.listen(process.env.PORT || 4200, () => {
    console.log(`Server is running on port ${process.env.PORT || 4200}`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
