import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import { Coord } from '../app'
import { error } from '../error'

const woltRestaurant = axios.create({
  baseURL: 'https://restaurant-api.wolt.com/v1/pages',
})

type Restaurant = {
  name: string
  location: {
    lat: string
    long: string
  }
  estimate: string
  tags: string[]
}

const randomNameFromRestaurants = (venues: any[]) => {
  const names = venues.flatMap(v => v.name.split(' '))

  const nOfWords = 2 + Math.floor(Math.random() * 4)
  const randomWord = () => names[Math.floor(Math.random() * names.length)]

  return new Array(nOfWords)
    .fill(0)
    .map(() => randomWord())
    .join(' ')
}

const parseResponse = (response: any[]): Restaurant[] =>
  response.map(({ venue }) => ({
    name: randomNameFromRestaurants(response.map(({ venue }) => venue)),
    location: {
      lat: venue.location[1],
      long: venue.location[0],
    },
    estimate: venue.estimate_range,
    tags: venue.tags,
  }))

export const getRestaurants = ({ lat, lon }: Coord) =>
  pipe(
    TE.tryCatch(
      () =>
        woltRestaurant
          .get('/delivery', { params: { lat, lon } })
          .then(res => res.data.sections[0].items),
      error('Failed to get restaurants from wolt')
    ),
    TE.map(parseResponse)
  )
