import { Request, Response } from 'express'
import { OrderService } from './order.service'
import { ProductModel } from '../product/product.model'
import { Oorder } from './order.interface'
import {
  OrderSchemaValidation,
  UpdateProductValidation,
} from './order.validation'

// // 1.Create a New Order
// // Endpoint: /api/orders
// start
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const product = await ProductModel.findById(orderData.productId)

    if (!product) {
      res.status(500).json({
        success: false,
        message: 'Product id  not found',
      })
    }

    if (product !== null) {
      if (product.inventory.quantity < orderData.quantity) {
        res.status(500).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        })
      } else {
        const newQuantity = (product.inventory.quantity -= orderData.quantity)

        const order: Oorder = {
          email: orderData.email as string,
          productId: product.id as string,
          price: product.price as number,
          quantity: orderData.quantity as number,
        }

        // updateProduct data validation using zod
        const zodValidateUpdateProduct = UpdateProductValidation.parse({
          id: product.id,
          Quantity: newQuantity,
        })

        // order data validation using zod
        const zodParseOrder = OrderSchemaValidation.parse(order)

        const result = await OrderService.createOrderIntoDb(zodParseOrder)
        if (result) {
          // Call update here
          await OrderService.updateProductAfterCreateOrder(
            zodValidateUpdateProduct.id,
            zodValidateUpdateProduct.Quantity,
          )
        }

        res.status(200).json({
          success: true,
          message: 'order created successfully!',
          data: result,
        })
      }
    }

    // const result = await OrderService.createOrderIntoDb(orderData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'create order data error',
      error: err,
    })
  }
}

// 2.Retrieve All Orders
// Endpoint: /api/orders
// Method: GET
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders()
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'get all orders data error',
      error: err,
    })
  }
}

//   3. Retrieve Orders by User Email
// Endpoint: /api/orders?email=level2@programming-hero.com
// Method: GET

const getSingleOrderEmail = async (req: Request, res: Response) => {
  const { email } = req.query

  if (typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email query parameter is required and must be a string',
    })
  }
  try {
    const result = await OrderService.getSingleOrderByEmail(email)

    if (!result) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'Orders fetched error for user email',
      error: err,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrderEmail,
}
