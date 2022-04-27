import Image from 'next/image'
import styled from 'styled-components'
import PlantContainer from './containers/plant'
import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'

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
    <>
      
      {data.mongoRes.map(item => {
          return <PlantContainer plant={item} key={item._id}/>
        })}
    </>
  )
}


