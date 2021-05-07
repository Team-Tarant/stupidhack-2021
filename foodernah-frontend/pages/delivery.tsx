import Delivery from '../components/Delivery'
import styles from '../styles/DeliveryPage.module.css'

const DeliveryPage = () => {
  const est = new Date(new Date().getTime() + 5 * 60 * 1000)
  return (
    <div className={styles.container}>
      <Delivery estimatedDelivery={est} />
    </div>
  )
}

export default DeliveryPage
