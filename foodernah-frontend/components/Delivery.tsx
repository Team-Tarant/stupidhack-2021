import { useContext, useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import TimeRemaining from './TimeRemaining'
import Notification from './Notification'
import styles from './Delivery.module.css'
import { explanations } from './data/explanations'
import { Router, useRouter } from 'next/router'
import random from 'random'
export interface DeliveryProps {
  deliveryStarted: Date
  estimatedDelivery: Date
  actualEstimatedDelivery: Date
}
type Explanation = string | null

const parseCoordsFromQuery = (query: string | string[] | undefined) => {
  if (typeof query === 'undefined') {
    return null
  }
  const str = Array.isArray(query) ? query[0] : query
  const [lat, lng] = str.split(',').map(s => parseFloat(s))
  if (isNaN(lat) || isNaN(lng)) {
    return null
  }

  return [lat, lng]
}

const Delivery = ({
  deliveryStarted,
  estimatedDelivery,
  actualEstimatedDelivery,
}: DeliveryProps) => {
  const mapRef = useRef<any>(null)
  const queryParams = useRouter().query
  const restaurantLocation = queryParams.restaurant
  const clientLocation = queryParams.client

  const [error, setError] = useState<string>()
  const [notification, setNotification] = useState<string | null>()

  const [threshold] = useState<number>(random.int(51, 98))
  const [deliveryFailed, setDeliveryFailed] = useState<boolean>(false)
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

            const restaurantCoords = parseCoordsFromQuery(restaurantLocation)
            const homeCoords = parseCoordsFromQuery(clientLocation)

            if (homeCoords) {
              const homeMarker = {
                path: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z',
                strokeColor: '#ecf0f1',
                fillColor: '#3498db',
                fillOpacity: 1,
                scale: 1.5,
                anchor: new (window as any).google.maps.Point(12, 12),
              }

              const homeLoc = new (window as any).google.maps.LatLng(
                ...homeCoords
              )
              new (window as any).google.maps.Marker({
                position: homeLoc,
                icon: homeMarker,
                map: mapRef.current,
              })
            }

            if (restaurantCoords) {
              const restaurantMarker = {
                path:
                  'M3,3A1,1 0 0,0 2,4V8L2,9.5C2,11.19 3.03,12.63 4.5,13.22V19.5A1.5,1.5 0 0,0 6,21A1.5,1.5 0 0,0 7.5,19.5V13.22C8.97,12.63 10,11.19 10,9.5V8L10,4A1,1 0 0,0 9,3A1,1 0 0,0 8,4V8A0.5,0.5 0 0,1 7.5,8.5A0.5,0.5 0 0,1 7,8V4A1,1 0 0,0 6,3A1,1 0 0,0 5,4V8A0.5,0.5 0 0,1 4.5,8.5A0.5,0.5 0 0,1 4,8V4A1,1 0 0,0 3,3M19.88,3C19.75,3 19.62,3.09 19.5,3.16L16,5.25V9H12V11H13L14,21H20L21,11H22V9H18V6.34L20.5,4.84C21,4.56 21.13,4 20.84,3.5C20.63,3.14 20.26,2.95 19.88,3Z',
                strokeColor: '#ecf0f1',
                fillColor: '#9b59b6',
                fillOpacity: 1,
                scale: 1.5,
                anchor: new (window as any).google.maps.Point(12, 12),
              }

              const restaurantLoc = new (window as any).google.maps.LatLng(
                ...restaurantCoords
              )
              new (window as any).google.maps.Marker({
                position: restaurantLoc,
                icon: restaurantMarker,
                map: mapRef.current,
              })
            }

            const bounds = new (window as any).google.maps.LatLngBounds()
            const paths = points
              .map((p: any) =>
                (window as any).google.maps.geometry.encoding.decodePath(p)
              )
              .flat()

            paths.forEach((p: any) => bounds.extend(p))

            const polyline = new (window as any).google.maps.Polyline({
              path: paths,
              strokeColor: '#FF0000',
              strokeOpacity: 0.0,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: mapRef.current,
              icons: [
                {
                  icon: {
                    path:
                      'M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z',
                    strokeColor: '#000',
                    strokeOpacity: 0.5,
                    fillColor: '#393',
                    fillOpacity: 1,
                    scale: 1.5,
                    anchor: new (window as any).google.maps.Point(12, 12),
                  },
                  offset: '100%',
                },
              ],
            })
            polyline.setMap(mapRef.current)
            mapRef.current.fitBounds(bounds)

            const startMs = deliveryStarted.getTime()
            const endMs = estimatedDelivery.getTime()

            token = setInterval(() => {
              const nowMs = new Date().getTime()
              const progressPercent =
                ((nowMs - startMs) / (endMs - startMs)) * 100

              const thresholdExceeded = threshold <= progressPercent
              if (thresholdExceeded) {
                clearInterval(token)
                // Router.push('/failed')
              }
              setDeliveryFailed(thresholdExceeded)

              const icons = polyline.get('icons')
              icons[0].offset = `${progressPercent.toFixed(2)}%`
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
      <Notification message={notification!} />
      <div id="map" className={styles.map} />
      <div className={styles['main']}>
        <TimeRemaining
          estimatedDelivery={actualEstimatedDelivery}
          deliveryFailed={deliveryFailed}
        />
        <div className={styles['main-content']}>
          <div className={styles['main-content-content']}>
            <div className={styles.restaurant}>Restaurant burger mall</div>
            <div className={styles.food}>1x Chef's Special</div>
            <br />
            <div className={styles.tip}>
              Order going too well?{' '}
              <a
                href="https://googlethatforyou.com?q=how%20to%20delete%20system32"
                rel="noopener nofollow"
                target="_blank"
                style={{ textDecoration: 'underline' }}
              >
                Let us know!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery
