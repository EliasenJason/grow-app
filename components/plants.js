import Image from 'next/image'
import styled from 'styled-components'
import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'

const Container = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 2fr 2fr; 
  gap: 0px 0px;
`



export default function Plants() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const email = useUser().user.email
  useEffect(() => {
    setLoading(true)
    console.log(email)
    fetch('/api/mongoDB/getUserPlants', {
      method: 'POST',
      body: email
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No plants available</p>
  //useUser().user.email
  
  return (
    <Container>
      {data.mongoRes.map(item => item.plantName)}
    </Container>
  )
}
/*
const res = await fetch('/api/mongoDB/createPlant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlant)
        })
        */

