import '../styles/globals.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
