// / Create the variants validation schema

import { z } from 'zod'

// / Create the variants validation schema
const PvariantsSchemaValidation = z.object({
  type: z.string(),
  value: z.string(),
})

// // / Create the inventory validation schema
const PinventorySchemaValidation = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

// Create the product validation schema

const PproductSchemaValidation = z.object({
  name: z.string().min(1, { message: 'name required' }),
  description: z.string().min(1, { message: 'description required' }),
  price: z.number().min(1, { message: 'price required' }),
  category: z.string().min(1, { message: 'category required' }),
  tags: z.array(z.string().min(1, { message: 'tags required' })),
  variants: z
    .array(PvariantsSchemaValidation)
    .min(1, { message: 'variants required' }),
  inventory: PinventorySchemaValidation,
})

export { PproductSchemaValidation }
