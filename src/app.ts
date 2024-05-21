import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { orderRoutes } from './app/modules/order/order.route'

const app: Application = express()
app.use(express.json())
app.use(cors())
// order
// /api/products

app.use('/api/products', ProductRoutes)

// order
// // Endpoint: /api/orders
app.use('/api/orders', orderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
