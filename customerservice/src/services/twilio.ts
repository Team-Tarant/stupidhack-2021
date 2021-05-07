import { Twilio } from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER

console.log('accountsid: ', accountSid)
console.log('authtoken', authToken)
const sendMessage = (userNumber: string, userMessage: string): void => {
  if (accountSid && authToken && userNumber && twilioNumber) {
    const client = new Twilio(accountSid, authToken)
    console.log(userMessage)
    client.messages
      .create({
        from: twilioNumber,
        to: userNumber,
        body: userMessage,
        messagingServiceSid: 'MG5af81d304ef10bd028286e46979a8b07',
      })
      .then(message => console.log(message.sid))
  } else {
    throw new Error('You fukked number')
  }
}

export default sendMessage
