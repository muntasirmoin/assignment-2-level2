import { Schema, model } from 'mongoose'
import { Oorder } from './order.interface'

// 1.Create a New Order
// Endpoint: /api/orders
// Method: POST
const OrderSchema = new Schema<Oorder>({
  // { type: String, required: [true, 'name required'] }
  email: { type: String, required: [true, 'Email required'], unique: true },
  productId: { type: String, required: [true, 'productID required'] },
  price: { type: Number, required: [true, 'price required'] },
  quantity: { type: Number, required: [true, 'quantity required'] },
})

export const OrderModel = model<Oorder>('orders', OrderSchema)
