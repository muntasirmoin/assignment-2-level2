import { z } from 'zod'

//order validation schema

const OrderSchemaValidation = z.object({
  email: z.string(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
})

//
const UpdateProductValidation = z.object({
  id: z.string(),
  Quantity: z.number(),
})

export { OrderSchemaValidation, UpdateProductValidation }
