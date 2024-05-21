import { Oorder } from './order.interface'
import { OrderModel } from './order.model'

// 1.Create a New Order
// Endpoint: /api/orders
// Method: POST

const createOrderIntoDb = async (OrderData: Oorder) => {
  const result = await OrderModel.create(OrderData)
  return result
}

// 2.Retrieve All Orders
// Endpoint: /api/orders
// Method: GET
const getAllOrders = async () => {
  const result = await OrderModel.find()
  return result
}

//   3. Retrieve Orders by User Email
// Endpoint: /api/orders?email=level2@programming-hero.com
// Method: GET
const getSingleOrderByEmail = async (email: string) => {
  const result = await OrderModel.findOne({ email: email })

  return result
}

export const OrderService = {
  createOrderIntoDb,
  getAllOrders,
  getSingleOrderByEmail,
}
