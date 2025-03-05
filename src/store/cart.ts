import { computed, ref } from 'vue'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import type { Product } from '@/api/product.ts'

export default defineStore('cart', () => {
  const cart = ref<Product[]>(JSON.parse(Cookies.get('cart') || '[]'))

  const batchedCart = computed(() => {
    const result: { count: number; value: Product }[] = [] as {
      count: number
      value: Product
    }[]

    cart.value.forEach((item) => {
      try {
        const existing = result.find((v) => v.value.id === item.id)
        if (existing) {
          existing.count += 1
        } else {
          result.push({ count: 1, value: item })
        }
      } catch (err) {
        console.error('Error:', err)
        result.push({ count: 1, value: item })
      }
    })
    return result
  })

  const cartTotal = computed(() => {
    let total = 0

    cart.value.forEach((item) => {
      total += item.price
    })

    return total.toFixed(2)
  })

  const addToCart = (product: Product) => {
    cart.value.push(product)
    Cookies.set('cart', JSON.stringify(cart.value), { expires: 7 })
  }

  const removeFromCart = (itemID: number) => {
    cart.value = cart.value.filter((item: Product) => item.id !== itemID)
    Cookies.set('cart', JSON.stringify(cart.value), { expires: 7 })
  }

  const clearCart = () => {
    cart.value = []
    Cookies.remove('cart')
  }

  return {
    cart,
    batchedCart,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
  }
})
