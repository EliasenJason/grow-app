import Header from '../components/header'
import CreatePlantForm from '../components/createplant'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function New() {
  return (
    <>
      <Header />
      <h2>To create a plant fill out the form below</h2>
      <CreatePlantForm />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()