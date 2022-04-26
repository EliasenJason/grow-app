import styled from "styled-components"

const Plant = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr .5fr;
  border: solid black 3px;
  margin: 2em;
  padding: 1em;
`

export default function PlantContainer({plant}) {
  return (
    <Plant>
      <section>{plant.plantName}</section>
      <section>{plant.plantedDate}</section>
      <section>
        <div>Watered Dates</div>
        <button>Water</button>
      </section>
      <section>Pictures</section>
      <section>
        <button>Edit</button> {/*bring up a pop up to rename, change planted date, delete water dates, delete pictures, change date of a picture? */}
        <button>Delete</button>
      </section>
    </Plant>
  )
}