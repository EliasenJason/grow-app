import Header from '../components/header'
import Button from '../components/button'
import Plants from '../components/plants'
import CreatePlantForm from '../components/createplant';
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

export default function Active({userData}) {
  const userName = 'Bob Jones' //need to pull this from auth0
  const [newPlantForm, setNewPlantForm] = useState(false)
  return (
    <>
      <Header />
      <Container>
        {newPlantForm ? <Button onclick={() => newPlantForm ? setNewPlantForm(false) : setNewPlantForm(true)}>cancel</Button> : <Button onclick={() => newPlantForm ? setNewPlantForm(false) : setNewPlantForm(true)}>Create New Plant</Button> }
        {newPlantForm ?  <CreatePlantForm /> : <Plants />}
      </Container>
      
    </>
  )
}
