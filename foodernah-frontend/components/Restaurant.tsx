import ProductListing from './ProductListing'
import Cart from './Cart'

export interface Product {
  name: string
  price: string
  info: string
}

interface RestaurantProps {
  name: string
  products: Product[]
}

const Restaurant = ({ name, products }: RestaurantProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <ProductListing products={products} />
      <Cart />
    </div>
  )
}

export default Restaurant