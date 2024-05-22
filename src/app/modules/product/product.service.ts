// import mongoose from 'mongoose'
import { Pproduct } from './product.interface'
import { ProductModel } from './product.model'

// create a product
// 1. Create a New Product
const createProductIntoDB = async (ProductData: Pproduct) => {
  const result = await ProductModel.create(ProductData)

  return result
}

// get all products data
// 2. Retrieve a List of All Products
const getAllProducts = async () => {
  const result = await ProductModel.find()
  return result
}

// get single product by id
// 3. Retrieve a Specific Product by ID
// /api/products/:productId
const getSingleProductById = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id })

  return result
}

//
// 4. Update Product Information
// Endpoint: /api/products/:productId
const updateProductById = async (id: string, inventoryQuantity: number) => {
  const result = await ProductModel.updateOne(
    { _id: id },
    // { $inc: { 'inventory.quantity': -1 } },
    {
      'inventory.quantity': inventoryQuantity,
      'inventory.inStock': inventoryQuantity > 0,
    },
  )
  return result
}

// 5. Delete a Product
// Endpoint: /api/products/:productId
const deleteSingleProduct = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id })
  return result
}

// 6. Search a product
// Endpoint: /api/products?searchTerm=iphone
// Method: GET

const searchProduct = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i') //Flag: 'i' uppercase and lowercase letters are treated as  equivalent (caseInsensitive).
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { tags: { $in: [regex] } },
    ],
  })
  if (result.length === 0) {
    return null
  }

  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  getSingleProductById,
  updateProductById,
  deleteSingleProduct,
  searchProduct,
}
