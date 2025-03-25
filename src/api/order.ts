import axios, { type AxiosResponse } from 'axios'
import { getAccessToken } from '@/api/auth.ts'
import type { Cart } from '@/store/cart.ts'

export type DeliveryInfo = {
  receiverName: string
  receiverEmail: string
  deliveryAddress: string
  deliveryCity: string
  deliveryZipCode: string
  deliveryCountry: string
  phone: string
}

export type Order = {
  userId: number
  products: Cart
  total?: number
  status?: 'pending' | 'delivered' | 'cancelled' | 'problems' | 'waitsCheckout'
  receiverName: string
  receiverEmail: string
  deliveryAddress: string
  deliveryCity: string
  deliveryZipCode: string
  deliveryCountry: string
  phone: string
}

export function getOrders(userId: number) {}

export function createOrder(order: Order): Promise<AxiosResponse> {
  return axios.post(import.meta.env.VITE_API_HOST + 'api/orders', order, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
}
