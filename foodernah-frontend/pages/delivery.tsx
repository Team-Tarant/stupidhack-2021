import Delivery from '../components/Delivery'
import styles from '../styles/DeliveryPage.module.css'

const DeliveryPage = () => {
  const est = new Date(new Date().getTime() + 1 * 60 * 1000)
  return (
    <div className={styles.container}>
      <Delivery deliveryStarted={new Date()} estimatedDelivery={est} />
    </div>
  )
}

export default DeliveryPage
