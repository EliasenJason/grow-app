import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import HeadTag from '../components/next/head'

function MyApp({ Component, pageProps }) {

  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  return (
    <>
      <HeadTag />
      <UserProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <Component {...pageProps} />
        </AlertProvider>
      </UserProvider>
    </>
  )
}

export default MyApp
