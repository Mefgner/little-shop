import { PrismaClient, Product } from '@prisma/client'
import IProduct from './products.dto'

export class ProductsService {
  private prisma = new PrismaClient()

  createProduct(product: IProduct): Promise<Product> {
    return this.prisma.product.create({ data: product })
  }

  async getProducts(limit = 20, offset = 0, query = ''): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: query ? { naming: { contains: query } } : {},
      take: limit,
      skip: offset,
    })
  }

  async getSimplified(
    limit = 20,
    offset = 0,
    query = '',
  ): Promise<{ id: number; shortNaming: string; price: number; photoUrl: string }[]> {
    return await this.prisma.product.findMany({
      where: query ? { naming: { contains: query } } : {},
      select: {
        id: true,
        shortNaming: true,
        price: true,
        photoUrl: true,
      },
      take: limit,
      skip: offset,
    })
  }

  async getProductById(id: number): Promise<IProduct | Product | null> {
    return await this.prisma.product.findUnique({ where: { id } })
  }
}
