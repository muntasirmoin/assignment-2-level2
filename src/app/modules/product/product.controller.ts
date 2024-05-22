import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import {
  PproductSchemaValidation,
  UpdateProductSchemaValidation,
} from './product.validation'

// create a product
// 1. Create a New Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    // data validation using zod
    const zodParseProductData = PproductSchemaValidation.parse(productData)

    const result =
      await ProductServices.createProductIntoDB(zodParseProductData)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'create Product data error',
      error: err,
    })
  }
}

// get all products data
// 2. Retrieve a List of All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts()
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'get all products data error',
      error: err,
    })
  }
}

// get single product by id
// 3. Retrieve a Specific Product by ID
// /api/products/:productId
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductServices.getSingleProductById(productId)

    if (!result) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'Single Product fetched error!',
      error: err,
    })
  }
}

// 4. Update Product Information
// Endpoint: /api/products/:productId
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    //
    const productData = req.body
    // data validation using zod
    const zodParseProductDataUpdate =
      UpdateProductSchemaValidation.parse(productData)

    //

    const result = await ProductServices.updateProductById(
      productId,
      zodParseProductDataUpdate,
    )
    const resultAfterupdate =
      await ProductServices.getSingleProductById(productId)

    if (!result) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!!',
      data: resultAfterupdate,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'Product update error!',
      error: err,
    })
  }
}

// 5. Delete a Product
// Endpoint: /api/products/:productId
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.deleteSingleProduct(productId)
    if (!result) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const resultAfterDelete =
      await ProductServices.getSingleProductById(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: resultAfterDelete,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong in product delete',
      error: err,
    })
  }
}

// 6. Search a product
// Endpoint: /api/products?searchTerm=iphone
// Method: GET

const searchAProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query

  if (!searchTerm || typeof searchTerm !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'searchTerm query parameter is required and must be a string',
    })
  }
  try {
    const result = await ProductServices.searchProduct(searchTerm)

    if (!result) {
      return res.status(404).json({ message: 'Product not matched' })
    }
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Orders fetched error for user email',
      error: err,
    })
  }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchAProduct,
}
