import React from 'react'
import { getRestaurants, Restaurant } from '../services/restaurants'
import { usePromise } from '../util/usePromise'
import styles from './RestaurantListing.module.css'
import Link from 'next/Link'

type Props = {
  clientPos: {
    lat: string
    lon: string
  }
}

const RestaurantItem = ({ restaurant }: { restaurant: Restaurant }) => (
  <Link href="/delivery">
    <div className={styles['restaurant-item']}>
      <div className={styles['restaurant-image']}></div>
      <div className={styles['restaurant-info']}>
        <h3 className={styles['restaurant-title']}>{restaurant.name}</h3>
        <div className={styles['restaurant-estimate']}>
          <p>{restaurant.estimate}</p>
          <p>min</p>
        </div>
      </div>
    </div>
  </Link>
)

export const RestaurantListing = ({ clientPos }: Props) => {
  const maybeRestaurants = usePromise(() =>
    getRestaurants(clientPos.lat, clientPos.lon)
  )
  return maybeRestaurants ? (
    <ul style={{ listStyleType: 'none' }}>
      {maybeRestaurants.map(restaurant => (
        <li>
          <RestaurantItem restaurant={restaurant} />
        </li>
      ))}
    </ul>
  ) : (
    <p>loading</p>
  )
}
