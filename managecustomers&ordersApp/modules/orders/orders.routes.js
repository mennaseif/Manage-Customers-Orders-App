import { Router } from 'express'
import { addOrder, getAverageOrderValue,getCustomersWithNoOrders,getCustomerWithMostItems, getTopSpentMostMoneyCustomers, 
         getCustomersWithAtLest5Orders, getPercentageOFCustomerswithOrders, getCustomerWithEarliestOrder} from './orders.controller.js'

const ordersRouter = Router()

ordersRouter.route('/').post(addOrder)
ordersRouter.route('/averageValue').get(getAverageOrderValue)
ordersRouter.route('/noOrdersCustomers').get(getCustomersWithNoOrders)
ordersRouter.route('/CustomerWithMostItems').get(getCustomerWithMostItems)
ordersRouter.route('/CustomerWithMostSpentMoney').get(getTopSpentMostMoneyCustomers)
ordersRouter.route('/CustomerWith5Orders&More').get(getCustomersWithAtLest5Orders)
ordersRouter.route('/percentOfCustomerWithOrders').get(getPercentageOFCustomerswithOrders)
ordersRouter.route('/CustomerWithEarliestOrder').get(getCustomerWithEarliestOrder)
export default ordersRouter