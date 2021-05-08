import { Product } from "./Restaurant"

interface CartProps {
  cart: Product[]
}

const Cart = (props: CartProps) => {
  return (
    <div>{props.cart.length} items</div>
  )
}

export default Cart