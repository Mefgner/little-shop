import { Router, Request, Response } from 'express'
import { ProductsService } from './products.service'
import { authMiddleware } from '../auth.middleware'
import IProduct from './products.dto'

const productRouter = Router()
const service = new ProductsService()

productRouter.get('/simplified', async (req: Request, res: Response) => {
  console.log('simplified')

  const query = req.query

  res
    .status(200)
    .json(
      await service.getSimplified(
        query.limit ? Number(query.limit) : 20,
        query.offset ? Number(query.offset) : 0,
        query.query ? String(query.query) : '',
      ),
    )
})

productRouter.get('/:id', async (req: Request, res: Response) => {
  console.log('byId')
  const id = Number(req.params.id)
  if (!id) {
    res.status(400).json({ msg: 'ID is required' })
    return
  }

  res.status(200).json(await service.getProductById(id))
})

productRouter.get('/', async (req: Request, res: Response) => {
  console.log('all')
  const query = req.query
  res
    .status(200)
    .json(
      await service.getProducts(
        query.limit ? Number(query.limit) : 20,
        query.offset ? Number(query.offset) : 0,
        query.query ? String(query.query) : '',
      ),
    )
})

productRouter.post('/', authMiddleware, async (req: Request, res: Response) => {
  console.log('create')
  const product: IProduct = req.body

  if (!product) {
    res.status(400).json({ msg: 'Product is required' })
    return
  } else if (!product.naming || !product.price || !product.description) {
    res.status(400).json({ msg: 'Field Error' })
    return
  }

  res.status(201).json(await service.createProduct(product))
})

export default productRouter
