import { Order, PrismaClient } from '@prisma/client'
import { Stripe } from 'stripe'
import { IOrder } from './order.dto'

export class OrderService {
  private prisma = new PrismaClient()
  private stripe = new Stripe(process.env.STRIPE_SECRET || '')

  createCheckout(
    stripefulData: { id: number; name: string; cost: number; count: number; total: number; img: string }[],
    orderId: number,
  ) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
      line_items: stripefulData.map((v) => {
        return {
          price_data: {
            product_data: {
              name: v.name,
              images: [process.env.SELF_URL + v.img],
            },
            currency: 'usd',
            unit_amount: v.cost * 100,
          },
          quantity: v.count,
        }
      }),
      metadata: { orderId: String(orderId) },
    })
  }

  getEvent(req: { body: string; headers: any }) {
    try {
      const sig = req.headers['stripe-signature']
      return this.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`)
    }
  }

  createOrder(order: IOrder): Promise<Order> {
    return this.prisma.order.create({ data: order })
  }

  setOrderPendig(orderId: number): Promise<Order> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'pending' },
    })
  }

  deleteOrder(orderId: number) {
    return this.prisma.order.delete({ where: { id: orderId } })
  }

  getActiveOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        status: {
          not: 'delivered',
        },
      },
    })
  }

  getOrderHistory(userId: number) {
    return this.prisma.order.findMany({ where: { userId } })
  }
}
