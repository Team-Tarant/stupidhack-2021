export type Coord = {
  lat: string
  lon: string
}

export const getUserGeolocation = (): Promise<Coord | null> =>
  typeof window === 'undefined'
    ? Promise.resolve(null)
    : new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          pos =>
            resolve({
              lat: String(pos.coords.latitude),
              lon: String(pos.coords.longitude),
            }),
          err => reject(err)
        )
      })
