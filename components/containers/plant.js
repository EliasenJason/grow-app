import styled from "styled-components"
import { useState } from "react"

const Plant = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr .5fr;
  border: solid black 3px;
  margin: 2em;
  padding: 1em;
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
          data.mongoRes.deletedCount = 1 ? setIsDeleted(true) : null
          setIsDeleting(false)
  }
  if (isDeleted) {
    return <></>
  } else {
    return (
      <Plant key={plant._id}>
        <section>{plant.plantName}</section>
        <section>{plant.plantedDate}</section>
        <section>
          <div>Watered Dates</div>
          <button>Water</button>
        </section>
        <section>Pictures</section>
        <section>
          <button>Edit</button> {/*bring up a pop up to rename, change planted date, delete water dates, delete pictures, change date of a picture? */}
          {isDeleting ? <button>DELETING...</button> : <button onClick={() => deletePlant(plant)}>Delete</button>}
        </section>
      </Plant>
    )
  }
}