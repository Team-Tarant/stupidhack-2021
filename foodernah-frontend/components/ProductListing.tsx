import { CartUpdateOperation, Product } from './Restaurant'
import styles from './ProductListing.module.css'
import { useState } from 'react'

interface ProductListingProps {
  products: Product[]
  cart: Product[]
  updateCart: (updateProduct: Product, operation: CartUpdateOperation) => void
}

interface ProductProps {
  product: Product
  productsInCart: number
  onAdd: () => void
}

const ProductListingItem = (props: ProductProps) => {
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <div className={styles.ProductListingItem}>
      <div
        onClick={() => setExpand(currentState => !currentState)}
        className={styles.ProductListingItemInfo}
      >
        <div>{props.product.name}</div>
        <div>{props.product.price}</div>
      </div>
      {expand && (
        <div className={styles.ProductListingItemDetails}>
          <div>{props.product.info}</div>
          {props.productsInCart > 0 && (
            <span>{props.productsInCart} in cart</span>
          )}
          <div onClick={props.onAdd}>Add to cart</div>
        </div>
      )}
    </div>
  )
}

const ProductListing = ({
  products,
  cart,
  updateCart,
}: ProductListingProps) => {
  return (
    <>
      {products.map(product => (
        <ProductListingItem
          onAdd={() => updateCart(product, 'add')}
          product={product}
          productsInCart={
            cart.filter(cartProduct => cartProduct === product).length
          }
        />
      ))}
    </>
  )
}

export default ProductListing
