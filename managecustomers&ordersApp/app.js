import express from 'express'
import customerRouter from './modules/customers/customers.routes.js'
import productsRouter from './modules/products/products.routes.js'
import ordersRouter from './modules/orders/orders.routes.js'

const app = express()
const port = 3000
app.use(express.json())

app.use('/auth', customerRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)





app.listen(port, () => console.log(`Example app listening on port ${port}!`))