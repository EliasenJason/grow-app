import Header from '../components/header'
import { useUser } from '@auth0/nextjs-auth0'
import styled from 'styled-components'
import Link from "next/link"
import Button from '../components/button'
import { useState } from "react"

const StyledBackground = styled.header`
  height: 100vh;
  font-family: 'Orelega One', cursive;
  background-image: url("/images/photo1.avif");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  .background {
    background-color: rgb(255,255,255,.5);
    padding: 2em;
    border-radius: 1em;
  }
  h1 {
    font-size: 4rem;
    width: 100%;
    text-align: center;
  }
  p {
    font-size: 1.5rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 0em 2em;
  }
`

export default function Home() {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return <StyledBackground>
      <div className="background">
        <h1>Plant Growing App</h1>
        <p>Track the life of your plants from seed to harvest</p>
        {user ? <p>Welcome back, {user.name}</p>: <p></p>}
        <Button><Link href="/active">Continue</Link></Button>
      </div>
    </StyledBackground>
  }
  return (
    <StyledBackground>
      <div className="background">
        <h1>Plant Growing App</h1>
        <p>Track the life of your plants from seed to harvest</p>
        <Button><a href="/api/auth/login">Signup Now</a></Button>
      </div>
    </StyledBackground>
  )
}
