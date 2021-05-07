import express from 'express'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { getRestaurants } from './service/restaurants'
import { error, FoodernahError } from './error'

const app = express()

const Coord = t.type({
  lat: t.string,
  lon: t.string,
})

export type Coord = t.TypeOf<typeof Coord>

const handle = <T>(
  task: TE.TaskEither<FoodernahError, T>,
  res: express.Response
) => {
  task().then(
    E.fold(
      e => res.status(e.status).json({ errors: e.message }),
      data => res.json(data)
    )
  )
}

app.get('/api/restaurants', (req, res) =>
  handle(
    pipe(
      req.query,
      Coord.decode,
      TE.fromEither,
      TE.mapLeft(errs => error(JSON.stringify(errs), 400)(null)),
      TE.chainW(getRestaurants)
    ),
    res
  )
)

const PORT = process.env.PORT || 3000

app.listen(process.env.PORT || 3000, () => console.log('Listening on', PORT))
