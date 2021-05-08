import { useState } from 'react'
import styles from './Failure.module.css'

const sendAspa = (phoneNumber: string) =>
  fetch(
    `https://stupidhack2021customerservice.lavikjo.com/api/customerservice?number=${encodeURIComponent(
      phoneNumber
    )}&pw=KISSATVITTUKOIRIAJAKOIRATVITTUKISSOJA`,
    { method: 'POST' }
  )

const Failure = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendAspa(phoneNumber).then(() => {
      setPhoneNumber('')
      alert('Thanks!')
    })
    // do something here
  }
  return (
    <div className={styles.container}>
      <div>
        <h1>Oh no!</h1>
        <p>Delivery failed!</p>
        <p>
          Please leave you phone number for our special message from our
          customer service:
        </p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={e => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder={'+3581234567'}
            value={phoneNumber}
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Failure
