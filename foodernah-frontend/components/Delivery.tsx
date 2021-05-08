import { useContext, useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import TimeRemaining from './TimeRemaining'
import styles from './Delivery.module.css'
import { useRouter } from 'next/router'
import { Coord } from '../util/geoloc'

export interface DeliveryProps {
  deliveryStarted: Date
  estimatedDelivery: Date
}

const Delivery = ({ deliveryStarted, estimatedDelivery }: DeliveryProps) => {
  const mapRef = useRef<any>(null)
  const queryParams = useRouter().query
  const restaurantLocation = queryParams.restaurant
  const clientLocation = queryParams.client
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GMAPS_API_KEY) {
      console.error('process.env.NEXT_PUBLIC_GMAPS_API_KEY not set')
      return
    }

    let token: any

    fetch(
      //'https://323bca54f19d.ngrok.io/api/route?startLocation=60.161720,24.867850&homeAddress=Leppäsuonkatu%2011'
      //59.933006, 30.347582 Voznesensky Ave, 25, Sankt-Peterburg, Russia, 190068
      `https://foodernah-route-fuckery.herokuapp.com/api/route?startLocation=${restaurantLocation}&homeAddress=${clientLocation}`
    )
      .then(res => res.json())
      .then(data => {
        const points = data
          .flatMap((d: any) => d.directions)
          .map((d: any) => d.polyline.points)

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string,
          version: 'weekly',
          libraries: ['geometry'],
        })

        loader
          .load()
          .then(() => {
            mapRef.current = new (window as any).google.maps.Map(
              document.getElementById('map') as HTMLElement,
              {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
              }
            )

            const bounds = new (window as any).google.maps.LatLngBounds()
            const paths = points
              .map((p: any) =>
                (window as any).google.maps.geometry.encoding.decodePath(p)
              )
              .flat()

            paths.forEach((p: any) => bounds.extend(p))

            const lineSymbol = {
              path: (window as any).google.maps.SymbolPath.CIRCLE,
              scale: 8,
              strokeColor: '#393',
            }

            const polyline = new (window as any).google.maps.Polyline({
              path: paths,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: mapRef.current,
              icons: [
                {
                  icon: lineSymbol,
                  offset: '100%',
                },
              ],
              // strokeColor: "#0000FF",
              // strokeOpacity: 1.0,
              // strokeWeight: 2
            })
            polyline.setMap(mapRef.current)
            mapRef.current.fitBounds(bounds)

            const startMs = deliveryStarted.getTime()
            const endMs = estimatedDelivery.getTime()

            token = setInterval(() => {
              const nowMs = new Date().getTime()
              const progressPercent =
                ((nowMs - startMs) / (endMs - startMs)) * 100

              const icons = polyline.get('icons')
              icons[0].offset = `${progressPercent.toFixed(1)}%`
              polyline.set('icons', icons)
            }, 100)
          })
          .catch(err => {
            console.error(err)
            setError("Sorry, you've used up our Google Maps API credits!")
          })
      })
      .catch(err => {
        console.error(err)
        setError(
          "The route to your home from the restaurant was so incomprehensible that even our algorithms can't help you.\n\nYou're welcome!"
        )
      })

    return () => clearInterval(token)
  }, [deliveryStarted, estimatedDelivery])

  return (
    <div className={styles.delivery}>
      {error && (
        <div className={styles.error}>
          <h2>Error</h2>
          {error}
        </div>
      )}
      <div id="map" className={styles.map} />
      <div className={styles['main']}>
        <TimeRemaining estimatedDelivery={estimatedDelivery} />
        <div className={styles['main-content']}>
          <div className={styles['main-content-content']}>
            <div className={styles.restaurant}>Restaurant burger mall</div>
            <div className={styles.tip}>Order going too well? Let us know!</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery
