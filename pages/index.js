import HeadTag from "../components/next/head"
import Header from '../components/header'
import { useUser } from '@auth0/nextjs-auth0'

export default function Home() {
  useUser()
  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  )
}
