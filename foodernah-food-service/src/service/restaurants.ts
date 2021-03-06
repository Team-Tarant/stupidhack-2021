import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import { Coord } from '../app'
import { error } from '../error'
import words from '../../suomi24dump.json'

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
  estimateMin: number
  tags: string[]
}

type Venue = {
  id: string
  name: string
  location: string[]
  estimate_range: string
  estimate: number
  tags: string[]
}

const strToNumber = (str: string) =>
  str.split('').reduce((p, c) => p + c.charCodeAt(0), 0)

const capitalizeFirst = (str: string) => {
  const [head, ...tail] = str.split('')
  return `${head.toUpperCase()}${tail.join('')}`
}

const wordFromNumber = (n: number) =>
  words.filter(w => w !== '')[n % words.length]

const randomNameFromRestaurants = (venue: Venue) => {
  const nOfWords = 1 + (venue.id.charCodeAt(0) % 3)

  const name = new Array(nOfWords)
    .fill(0)
    .map((_, i) => venue.id.substr(i, i + 3))
    .map(strToNumber)
    .map(wordFromNumber)
    .map(capitalizeFirst)
    .join(' ')

  const isPizzeria =
    venue.tags.includes('pizza') || venue.tags.includes('pizzeria')
  const isCafe = venue.tags.includes('café') || venue.tags.includes('coffee')
  const isBurgerPlace = venue.tags.includes('burger')

  return `${isPizzeria ? 'Pizzeria ' : isCafe ? 'Café ' : ''}${name}${
    isBurgerPlace ? ' Burgers' : ''
  }`
}

const parseResponse = (response: { venue: Venue }[]): Restaurant[] =>
  response.map(({ venue }) => ({
    name: randomNameFromRestaurants(venue),
    location: {
      lat: venue.location[1],
      long: venue.location[0],
    },
    estimateMin: venue.estimate,
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
    TE.map(parseResponse),
    TE.map(r => r.slice(0, 20))
  )
