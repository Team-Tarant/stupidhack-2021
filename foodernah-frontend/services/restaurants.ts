export type Restaurant = {
  name: string
  location: {
    lat: string
    long: string
  }
  estimate: string
  estimateMin: number
  tags: string[]
}

export const getRestaurants = (
  lat: string,
  lon: string
): Promise<Restaurant[]> =>
  fetch(
    `https://foodernah-restaurants.herokuapp.com/api/restaurants?lat=${lat}&lon=${lon}`
  ).then(res => res.json())
