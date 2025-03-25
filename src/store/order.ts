import { defineStore } from 'pinia'
import { createOrder, type Order } from '@/api/order.ts'

export default defineStore('order', () => {
  function placeOrder(orderInfo: Order) {
    return createOrder(orderInfo)
  }

  return {
    placeOrder,
  }
})
