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

// http://localhost:3000/
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app
