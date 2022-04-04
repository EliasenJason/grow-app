import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 2fr 2fr; 
  gap: 0px 0px;
`



export default function Plants({data}) {
  
  return (
    <Container>
      {data.plants.map(plant => {
        return (
          <>
            <p>Plant Name</p><p>Date Planted</p><p>Watered Dates</p><p>Images</p>
            <Plant key={plant._id} plant={plant} />
          </>
        )
      })}
    </Container>
  )
}

const Plant = function Plant({plant}) {
  console.log(plant)
  return (
    <>
      <h3>{plant.name}</h3>
      <p>{plant.plantedDate}</p>
      <div>
        {plant.wateredDates.map(date => {
          return (<p key={date}>{date}</p>)
        })}
      </div>
      <div>
        {plant.picture.map(picture => {
          return (<><Image key={picture.url} src={picture.url} width='50px' height='50px' alt='picture of the plant' /><p>{picture.date}</p></>)
        })}
      </div>
    </>

  )
}

