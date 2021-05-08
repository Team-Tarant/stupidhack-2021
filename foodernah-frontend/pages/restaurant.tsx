import Restaurant, { Product } from '../components/Restaurant'
import styles from '../styles/RestaurantPage.module.css'

const RestaurantPage = () => {
  const name = 'Unicafe Bmur'
  const products: Product[] = [
    {
      name: 'Päivän panini',
      price: '2.60eur',
      info: 'Mr panini!'
    },
    {
      name: 'Päivän salaatti',
      price: '2.60eur',
      info: 'salad'
    }
  ]
  
  return (
    <div className={styles.container}>
      <Restaurant name={name} products={products} />
    </div>
  )
}

export default RestaurantPage