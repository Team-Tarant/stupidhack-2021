import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import TimeRemaining from './TimeRemaining'
import styles from './Delivery.module.css'

export interface DeliveryProps {
  estimatedDelivery: Date
}

const Delivery = ({ estimatedDelivery }: DeliveryProps) => {
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GMAPS_API_KEY) {
      console.error('process.env.NEXT_PUBLIC_GMAPS_API_KEY not set')
      return
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['geometry'],
    })

    const pathstr =
      'knjmEnjunUbKCfEA?_@]@kMBeE@qIIoF@wH@eFFk@WOUI_@?u@j@k@`@EXLTZHh@Y`AgApAaCrCUd@cDpDuAtAoApA{YlZiBdBaIhGkFrDeCtBuFxFmIdJmOjPaChDeBlDiAdD}ApGcDxU}@hEmAxD}[tt@yNb\\yBdEqFnJqB~DeFxMgK~VsMr[uKzVoCxEsEtG}BzCkHhKWh@]t@{AxEcClLkCjLi@`CwBfHaEzJuBdEyEhIaBnCiF|K_Oz\\{MdZwAbDaKbUiB|CgCnDkDbEiE|FqBlDsLdXqQra@kX|m@aF|KcHtLm@pAaE~JcTxh@w\\`v@gQv`@}F`MqK`PeGzIyGfJiG~GeLhLgIpIcE~FsDrHcFfLqDzH{CxEwAbBgC|B}F|DiQzKsbBdeA{k@~\\oc@bWoKjGaEzCoEzEwDxFsUh^wJfOySx[uBnCgCbCoFlDmDvAiCr@eRzDuNxC_EvAiFpCaC|AqGpEwHzFoQnQoTrTqBlCyDnGmCfEmDpDyGzGsIzHuZzYwBpBsC`CqBlAsBbAqCxAoBrAqDdDcNfMgHbHiPtReBtCkD|GqAhBwBzBsG~FoAhAaCbDeBvD_BlEyM``@uBvKiA~DmAlCkA|B}@lBcChHoJnXcB`GoAnIS~CIjFDd]A|QMlD{@jH[vAk@`CoGxRgPzf@aBbHoB~HeMx^eDtJ}BnG{DhJU`@mBzCoCjDaAx@mAnAgCnBmAp@uAj@{Cr@wBPkB@kBSsEW{GV}BEeCWyAWwHs@qH?cIHkDXuDn@mCt@mE`BsH|CyAp@}AdAaAtAy@lBg@pCa@jE]fEcBhRq@pJKlCk@hLFrB@lD_@xCeA`DoBxDaHvM_FzImDzFeCpDeC|CkExDiJrHcBtAkDpDwObVuCpFeCdHoIl\\uBjIuClJsEvMyDbMqAhEoDlJ{C|J}FlZuBfLyDlXwB~QkArG_AnDiAxC{G|OgEdLaE`LkBbEwG~KgHnLoEjGgDxCaC`BuJdFkFtCgCnBuClD_HdMqEzHcBpB_C|BuEzCmPlIuE|B_EtDeBhCgAdCw@rCi@|DSfECrCAdCS~Di@jDYhA_AlC{AxCcL`U{GvM_DjFkBzBsB`BqDhBaEfAsTvEmEr@iCr@qDrAiFnCcEzCaE~D_@JmFdGQDwBvCeErEoD|BcFjC}DbEuD~D`@Zr@h@?d@Wr@}@vAgCbEaHfMqA`Cy@dAg@bAO`@gCi@w@W'

    loader.load().then(() => {
      mapRef.current = new (window as any).google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        }
      )

      const bounds = new (window as any).google.maps.LatLngBounds()
      const path = (window as any).google.maps.geometry.encoding.decodePath(
        pathstr
      )
      path.forEach((p: any) => bounds.extend(p))

      const polyline = new (window as any).google.maps.Polyline({
        path: path,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: mapRef.current,
        // strokeColor: "#0000FF",
        // strokeOpacity: 1.0,
        // strokeWeight: 2
      })
      polyline.setMap(mapRef.current)
      mapRef.current.fitBounds(bounds)
    })
  }, [])

  return (
    <div className={styles.delivery}>
      <div id="map" className={styles.map} />
      <div className={styles['main']}>
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
