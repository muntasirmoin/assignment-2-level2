// {
//     "email": "level2@programming-hero.com",
//     "productId": "5fd67e890b60c903cd8544a3",
//     "price": 999,
//     "quantity": 1
// }

export type Oorder = {
  email: string
  productId: string
  price: number
  quantity: number
}

// validate
export type UpdateProductParams = {
  id: string
  Quantity: number
}
