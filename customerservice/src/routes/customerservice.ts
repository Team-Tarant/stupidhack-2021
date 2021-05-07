import express from 'express'
import sendMessage from '../services/twilio'
import randomResponse from '../services/response'

const customerServiceRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
customerServiceRouter.post('/', (req: any, res) => {
    const pw: string = req.query.pw
    if( pw === process.env.PASSWORD) {
        const number: string = decodeURIComponent(req.query.number)
        const message: string = randomResponse()
        console.log('sending message to ', number)
        try {
            sendMessage(number, message)
        } catch (error) {
            res.sendStatus(400)
        }

        res.send('kund är glad!')
        }
    })

export default customerServiceRouter
