import React, { useContext } from 'react'
import { getRestaurants, Restaurant } from '../services/restaurants'
import { usePromise } from '../util/usePromise'
import styles from './RestaurantListing.module.css'
import Link from 'next/Link'
import { GeolocationContext } from '../pages'
import { Coord } from '../util/geoloc'

const RestaurantItem = ({
  restaurant,
  clientPos,
}: {
  restaurant: Restaurant
  clientPos: Coord
}) => (
  <Link
    href={{
      pathname: '/delivery',
      query: {
        restaurant: `${restaurant.location.lat},${restaurant.location.long}`,
        client: `${clientPos.lat},${clientPos.lon}`,
        estimate: restaurant.estimateMin,
      },
    }}
  >
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

export const RestaurantListing = () => {
  const clientPos = useContext(GeolocationContext)

  const maybeRestaurants = usePromise(() =>
    getRestaurants(clientPos!.lat, clientPos!.lon)
  )

  return maybeRestaurants ? (
    <ul style={{ listStyleType: 'none' }}>
      {maybeRestaurants.map(restaurant => (
        <li>
          <RestaurantItem restaurant={restaurant} clientPos={clientPos!} />
        </li>
      ))}
    </ul>
  ) : (
    <p>loading</p>
  )
}
