import { Schema, model } from 'mongoose'
import { Pinventory, Pproduct, Pvariants } from './product.interface'

// / Create the variants schema
const PvariantsSchema = new Schema<Pvariants>({
  type: { type: String, required: [true, 'type required'] },
  value: { type: String, required: [true, 'value required'] },
})

// Create the inventory schema
const PinventorySchema = new Schema<Pinventory>({
  quantity: { type: Number, required: [true, 'quantity required'] },
  inStock: { type: Boolean, required: [true, 'inStock required'] },
})

// Create the product schema
const PproductSchema = new Schema<Pproduct>({
  name: { type: String, required: [true, 'name required'] },
  description: { type: String, required: [true, 'description required'] },
  price: { type: Number, required: [true, 'price required'] },
  category: { type: String, required: [true, 'category required'] },
  tags: { type: [String], required: [true, 'tags required'] },
  // variants: { type: PvariantsSchema, required: [true, 'variants required'] },
  variants: { type: [PvariantsSchema], required: [true, 'variants required'] },
  inventory: { type: PinventorySchema, required: [true, 'inventory required'] },
})

export const ProductModel = model<Pproduct>('products', PproductSchema)
