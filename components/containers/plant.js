import styled from "styled-components"
import { useState } from "react"
import Image from 'next/image'


const Plant = styled.div`
  width: 390px;
  margin: 0 auto;
  border: solid black 1px;
  display: grid; 
  grid-template-columns: 0.9fr 1.1fr 1fr; 
  grid-template-rows: 0.2fr 1.8fr 0.5fr 1.5fr; 
  gap: 0em; 
  grid-template-areas: 
    "name name name"
    "picture picture picture"
    "picture-carousel picture-carousel picture-carousel"
    "water water buttons"; 

  .name {
    grid-area: name;
    text-align: center;
  }
  .picture {
    grid-area: picture;
    border: solid black 1px;
    margin: 0 auto;
    border-radius: 100%;
  }
  h3 {
    margin: 0 auto;
    border: solid black 1px;
    text-align: center;
  }
  .picture-carousel {
    grid-area: picture-carousel;
    border: solid black 1px; 
  }
  .buttons {
    grid-area: buttons;
    border: solid black 1px;
    display: flex;
    flex-direction: column;
  }
  .buttons button {
    flex-grow: 1;
  }
  .water {
    grid-area: water;
    border: solid black 1px;
    }
`


export default function PlantContainer({plant}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const deletePlant = async ({_id}) => {
    console.log(_id)
    setIsDeleting(true)
          const res = await fetch('/api/mongoDB/deletePlant', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(plant._id)
          })
          const data = await res.json()
          data.mongoRes.deletedCount = 1 && setIsDeleted(true)
          setIsDeleting(false)
  }
  if (isDeleted) {
    return <></>
  } else {
    return (
      <Plant key={plant._id}>
        <div class="name">{plant.plantName}</div>
        <div class="picture">
          <Image src="/images/plantIcon.png" width="200px" height="200px" />
          <h3>Planted: {plant.plantedDate.slice(0,10)}</h3>
        </div>
        <div class="picture-carousel">this area will have a carousel of mini pictures, onclick to fill above image</div>
        <div class="water">need to setup a sweet calendar with water symbols</div>
        <div class="buttons">
          <button>Add Photo</button>
          <button>Edit</button> {/*bring up a pop up to rename, change planted date, delete water dates, delete pictures, change date of a picture? */}
          {isDeleting ? <button>DELETING...</button> : <button onClick={() => deletePlant(plant)}>Delete</button>}
          <button>Water</button>
          <button>Harvest</button>
        </div>
      </Plant>
    )
  }
}