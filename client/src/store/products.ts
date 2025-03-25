import { defineStore } from 'pinia'
import {
  fetchProduct,
  fetchProducts,
  fetchSimplifiedProducts,
  type FullProduct,
  type Product,
} from '@/api/product.ts'

export default defineStore('products', () => {
  const getProducts = async () => {
    const response = await fetchProducts()
    if (response.status !== 200) {
      throw new Error('Products not found')
    }
    return response.data
  }

  const getSimplifiedProducts = async (query: string): Promise<Product[]> => {
    const response = await fetchSimplifiedProducts(query)
    if (response.status !== 200) {
      throw new Error('Products not found')
    }
    return response.data
  }

  const getProduct = async (id: number): Promise<FullProduct> => {
    const response = await fetchProduct(id)
    if (response.status !== 200) {
      throw new Error('Product not found')
    }
    return response.data
  }

  const getFullImgLink = (product: Product): string => {
    return import.meta.env.VITE_API_HOST + product.photoUrl
  }

  const simplifyProduct = (product: FullProduct): Product => {
    return {
      id: product.id,
      shortNaming: product.shortNaming,
      price: product.price,
      photoUrl: product.photoUrl,
    }
  }

  return {
    getProducts,
    getSimplifiedProducts,
    getProduct,
    getFullImgLink,
    simplifyProduct,
  }
})
