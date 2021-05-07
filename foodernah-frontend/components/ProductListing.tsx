import { Product } from "./Restaurant";
import styles from './ProductListing.module.css'
import { useState } from "react";

interface ProductListingProps {
  products: Product[]
}

interface ProductProps {
  product: Product
}

const ProductListingItem = (props: ProductProps) => {
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <div className={styles.ProductListingItem}>
      <div onClick={() => setExpand(currentState => !currentState)} className={styles.ProductListingItemInfo}>
        <div>
        {props.product.name}
        </div>
        <div>
          {props.product.price}
        </div>
      </div>
      {expand &&
        <div className={styles.ProductListingItemDetails}>
          <div>
          {props.product.info}
          </div>
          <div>Add to cart</div>
        </div>}
    </div>
  )
}

const ProductListing = ({ products }: ProductListingProps) => {
  return (
    <>
      {products.map(product => <ProductListingItem product={product} />)}
    </>
  )
}

export default ProductListing