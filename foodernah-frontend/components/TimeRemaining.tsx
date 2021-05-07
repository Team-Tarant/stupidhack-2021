import { useState, useEffect } from 'react'
import formatDistance from 'date-fns/formatDistance'

import styles from './TimeRemaining.module.css'

interface TimeRemainingProps {
  estimatedDelivery: Date
}

const TimeRemaining = ({ estimatedDelivery }: TimeRemainingProps) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const token = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(token)
  }, [setNow, estimatedDelivery])

  const date = formatDistance(estimatedDelivery, now, {
    includeSeconds: true,
  })

  return (
    <div className={styles['time-remaining']}>
      <div className={styles.circle}>
        <div className={styles['circle-content']}>
          <div className={styles.time}>{date}</div>
          <div className={styles.remaining}>until successful delivery</div>
        </div>
      </div>
    </div>
  )
}

export default TimeRemaining
