import { Router, Request, Response } from 'express'
import type { Stripe } from 'stripe'
import { OrderService } from './order.service'
import { authMiddleware } from '@/auth.middleware'
import { ProductsService } from '@/products/products.service'
import { decryptToken } from '@/utils/jwt'
import { IMinimalUser } from '@/user/user.dto'

const orderRouter = Router()
export default orderRouter

const service = new OrderService()
const productService = new ProductsService()

async function getStripefulTotals(order: { value: { id: number }; count: number }[]) {
  const totals = await Promise.all(
    order.map(async (v) => {
      const id = v.value.id
      const count = v.count
      const product = await productService.getProductById(id)
      if (product) {
        const name = product.naming
        const img = product.photoUrl
        const cost = product.price
        const total = cost * count
        return { id, name, img, cost, count, total }
      } else {
        throw new Error('cannot find a product!')
      }
    }),
  )
  const total = totals.reduce((acc, curr) => acc + curr.total, 0)
  return { totals, total }
}

orderRouter.get('/personal-order-list', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userInfo = decryptToken(req.headers.authorization?.split(' ')[1] || '') as IMinimalUser
    if (userInfo) {
      const orderList = await service.getOrderHistory(userInfo.id)
      res.status(200).json(
        orderList.map((order) => {
          const { id, products, status } = order
          return { id, products, status }
        }),
      )
    }
  } catch (e: any) {
    console.error(e.message)
    res.status(400).json(e.message)
  }
})

orderRouter.post('/', authMiddleware, async (req: Request, res: Response) => {
  console.log('order / post')

  try {
    const orderProducts = await getStripefulTotals(req.body.products)

    const orderInfo = req.body

    orderInfo.products = orderProducts.totals
    orderInfo.total = orderProducts.total

    const order = await service.createOrder(orderInfo)
    const payment = service.createCheckout(orderProducts.totals, order.id)
    payment.then((payload) => {
      res.status(201).json(payload.url)
      return
    })
  } catch (e: any) {
    console.error(e)
    res.status(400).json(e.message)
  }
})

export async function stripeWebhookController(req: Request, res: Response) {
  console.log('order /stripe-webhook post')
  try {
    const event = service.getEvent(req)
    const session = event.data.object as Stripe.Checkout.Session

    console.log('order type: ', event.type)

    if (!session.metadata) {
      res.status(400).send('no metadata')
      return
    }

    const meta = session.metadata

    if (!meta['orderId']) {
      res.status(400).send('no order id')
      return
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await service.setOrderPendig(parseInt(meta.orderId))
        res.sendStatus(200)
        break
      case 'checkout.session.expired':
      case 'payment_intent.payment_failed':
        await service.deleteOrder(parseInt(meta.orderId))
        res.sendStatus(200)
        break
      default:
        res.sendStatus(404)
    }
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json(error.message)
  }
}
