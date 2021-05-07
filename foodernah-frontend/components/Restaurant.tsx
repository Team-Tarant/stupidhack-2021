import ProductListing from './ProductListing'
import Cart from './Cart'
import { useState } from 'react'

export interface Product {
  name: string
  price: string
  info: string
}

interface RestaurantProps {
  name: string
  products: Product[]
}

export type CartUpdateOperation = 'add' | 'remove'

const Restaurant = ({ name, products }: RestaurantProps) => {
  const [cart, setCart] = useState<Product[]>([])
  const updateCart = (updateProduct: Product, operation: CartUpdateOperation) => {
    setCart(currentCart => operation === 'add' ? [...currentCart, updateProduct] : currentCart.filter((_, index) => index !== currentCart.findIndex(product => product.name === updateProduct.name)))
  }
  return (
    <div>
      <h1>{name}</h1>
      <ProductListing products={products} cart={cart} updateCart={updateCart} />
      <Cart cart={cart} />
    </div>
  )
}

export default Restaurant