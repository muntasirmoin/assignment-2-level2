import express, { Request, Response } from 'express'

import { ProductControllers } from './product.controller'

const router = express.Router()

// create a product
// 1. Create a New Product
// Endpoint: /api/products
router.post('/', ProductControllers.createProduct)

// get all products data
// 2. Retrieve a List of All Products
// Endpoint: /api/products
// router.get('/', ProductControllers.getAllProducts)
// 6. Search a product
// Endpoint: /api/products?searchTerm=iphone
// Method: GET
// router.get('/', ProductControllers.searchAProduct)
router.get('/', (req: Request, res: Response) => {
  const { searchTerm } = req.query

  if (searchTerm) {
    ProductControllers.searchAProduct(req, res)
  } else {
    ProductControllers.getAllProducts(req, res)
  }
})

// get single product by id
// 3. Retrieve a Specific Product by ID
// Endpoint: /api/products/:productId
router.get('/:productId', ProductControllers.getSingleProduct)

// 4. Update Product Information
// Endpoint: /api/products/:productId
// Method: PUT

router.put('/:productId', ProductControllers.updateProduct)

// 5. Delete a Product
// Endpoint: /api/products/:productId
router.delete('/:productId', ProductControllers.deleteProduct)

export const ProductRoutes = router
