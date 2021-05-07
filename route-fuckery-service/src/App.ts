import * as express from 'express'
import RouteService from './services/RouteService'

let app: express.Application = express()

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

const routeService = new RouteService()

app.get('/api/route', async (req, res) => {
  let locationString = req.query.startLocation.toString().split(',')
  let startLocation = {
    lat: Number(locationString[0]),
    lng: Number(locationString[1]),
  }

  try {
    let route = await routeService.findALITRouteToDestination(
      startLocation,
      req.query.homeAddress.toString()
    )
    res.status(200).json(route.steps)
  } catch (e) {
    console.log(e)
    res.status(e.httpErrorCode || 500).json({ message: 'error' })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log('Listening on', PORT))
