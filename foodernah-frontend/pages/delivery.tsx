import Delivery from '../components/Delivery'
import styles from '../styles/DeliveryPage.module.css'
import { useRouter } from 'next/router'

const DeliveryPage = () => {
  const queryParams = useRouter().query
  const estMin = queryParams.estimate?.toString() || 0
  const est = new Date(
    new Date().getTime() + 1 * (Number(estMin) * 3) * 60 * 1000
  )
  return (
    <div className={styles.container}>
      <Delivery
        deliveryStarted={new Date()}
        estimatedDelivery={est}
        actualEstimatedDelivery={
          new Date(Date.now() + Number(estMin) * 60 * 1000)
        }
      />
    </div>
  )
}

export default DeliveryPage
