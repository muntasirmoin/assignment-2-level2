import express, { Request, Response } from 'express'
import { OrderControllers } from './order.controller'

// // 1.Create a New Order
// // Endpoint: /api/orders

const OrderRouter = express.Router()
OrderRouter.post('/', OrderControllers.createOrder)
// 2.Retrieve All Orders
// Endpoint: /api/orders
// Method: GET

// OrderRouter.get('/', OrderControllers.getAllOrders)

//   3. Retrieve Orders by User Email
// Endpoint: /api/orders?email=level2@programming-hero.com
// Method: GET
// OrderRouter.get('/', OrderControllers.getSingleOrderEmail)

//
OrderRouter.get('/', (req: Request, res: Response) => {
  const { email } = req.query

  if (email) {
    OrderControllers.getSingleOrderEmail(req, res)
  } else {
    OrderControllers.getAllOrders(req, res)
  }
})

export const orderRoutes = OrderRouter
