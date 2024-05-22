import { z } from 'zod'

//order validation schema

const OrderSchemaValidation = z.object({
  email: z.string(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export { OrderSchemaValidation }
