const responses = [
  "We are so so so sorry that you didn't get your order",
  'Remember that you can use microware to heat your food',
  'Sorry our courier has lost will to live',
  'Our courier had to take day off due to personal reasons',
  'Sorry our courier has decided to switch to Wolt',
  'Remember that you can always walk to the get the food yourself',
  "Sorry, we accidentally mistook other person's order as your order",
  'Sorry, you were not at home',
  'Sorry, we tried nothing and ran out of ideas',
  "I'm sorry but you should enter your address more carefully next time",
  'We are sorry but your courier does not yet support 5G tracking blood cells',
  'Sorry your courier attempted to unionize and was fed to laser sharks',
  'Your courier decided to have a short coffee break',
]

const randomResponse = (): string => {
  const msg: string = responses[Math.floor(Math.random() * responses.length)]
  console.log(msg)
  return msg
}

export default randomResponse
