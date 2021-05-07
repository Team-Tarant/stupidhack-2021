import { Loader } from '@googlemaps/js-api-loader'
import TimeRemaining from './TimeRemaining'
import styles from './Delivery.module.css'

export interface DeliveryProps {
  estimatedDelivery: Date
}

const Delivery = ({ estimatedDelivery }: DeliveryProps) => {
  
  return (
    <div className={styles.delivery}>
      <div className={styles['main']}>
        <div className={styles.mainbg} />
        <TimeRemaining estimatedDelivery={estimatedDelivery} />
        <div className={styles['main-content']}>
          <div className={styles.restaurant}>Restaurant burger mall</div>
          <div className={styles.tip}>Order going too well? Let us know!</div>
        </div>
      </div>
    </div>
  )
}

export default Delivery
