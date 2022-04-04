import Header from '../components/header'
import Button from '../components/button'
import Plants from '../components/plants'
import CreatePlantForm from '../components/createplant';
import clientPromise from "../lib/mongodb";
import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
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
        <Button onclick={() => newPlantForm ? setNewPlantForm(false) : setNewPlantForm(true)}>Create New Plant</Button>
        {newPlantForm ?  <CreatePlantForm /> : <Plants data={userData} />}
      </Container>
      
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async  getServerSideProps(context) {
    const client = await clientPromise;
  
    const db = client.db("Testing");
  
    let userData = await db.collection("plants").findOne({userName: 'Bob Jones'}, {lean: true});
    userData = JSON.parse(JSON.stringify(userData));
  
    return {
      props: { userData },
    };
  }
})
