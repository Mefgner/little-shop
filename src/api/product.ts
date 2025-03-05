import type { AxiosResponse } from 'axios'
import axios from 'axios'

interface Product {
  id: number
  shortNaming: string
  price: number
  photoUrl: string
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(`Error occurred: ${error}`)
    return Promise.reject(error)
  },
)

type FullProduct = Product & {
  naming: string
  shortDescription: string
  description: string
  specifications: {
    [key: string]: string
  }
  created_at: string
  updated_at: string
}

export type { Product, FullProduct }

export function fetchProducts(): Promise<AxiosResponse<FullProduct[]>> {
  return apiClient.get('api/products')
}

export function fetchSimplifiedProducts(): Promise<AxiosResponse<Product[]>> {
  return apiClient.get('api/products/simplified')
}

export function fetchProduct(id: number): Promise<AxiosResponse<FullProduct>> {
  return apiClient.get('api/products/' + id)
}
