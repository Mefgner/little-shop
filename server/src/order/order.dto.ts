import { JsonObject } from '@prisma/client/runtime/library'

export interface IOrder {
  userId?: number
  products: JsonObject
  total: number
  status: 'pending' | 'delivered' | 'cancelled' | 'problems'
  receiverName: string
  receiverEmail: string
  deliveryAddress: string
  deliveryCity: string
  deliveryZipCode: string
  deliveryCountry: string
  phone: string
}
