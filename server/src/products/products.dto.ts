import { JsonObject } from '@prisma/client/runtime/library'

export default interface IProduct {
  naming: string
  price: number
  photoUrl: string
  shortNaming: string
  shortDescription: string
  description: string
  specifications: JsonObject
}

export interface IProductFull extends IProduct {
  id: number
  createdAt?: Date
  updatedAt?: Date
}
