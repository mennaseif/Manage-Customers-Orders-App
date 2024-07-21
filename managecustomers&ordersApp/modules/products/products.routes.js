import { Router } from 'express'
import { addProduct, getTotalRevenueProducts, itemsSoldByProduct } from './products.controller.js'
const productsRouter = Router()

productsRouter.route('/').post(addProduct)
productsRouter.route('/totalProductsRevenue').get(getTotalRevenueProducts)
productsRouter.route('/itemsSoldByProduct').get(itemsSoldByProduct)

export default productsRouter