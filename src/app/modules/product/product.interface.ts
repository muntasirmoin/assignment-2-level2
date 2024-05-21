// variants interface
export type Pvariants = {
  type: string
  value: string
}

// inventory interface

export type Pinventory = {
  quantity: number
  inStock: boolean
}

// products interface
export type Pproduct = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: Pvariants
  inventory: Pinventory
}
