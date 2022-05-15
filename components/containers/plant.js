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
  const [ isDeleting, setIsDeleting ] = useState(false)
  const [ isDeleted, setIsDeleted ] = useState(false)
  const [ image, setImage ] = useState('')
  const [ url, setUrl ] = useState(null)
  console.log(plant.pictures)

  const uploadImage = async () => {
    console.log(image)
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'plant_picture')
    data.append('cloud_name', 'dzxhltwmz')
    console.log(data)
    fetch(process.env.CLOUDINARY_UPLOAD_URL, {
      method:'post',
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('sending data url to backend: ', data.url)
      console.log('sending plant id to backend:', plant._id)
      if (data.url) {
        setUrl(data.url)
        return fetch('/api/mongoDB/addPhoto', {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ 
            'url': data.url,
            'id': plant._id
          })
        })
        .then(res => res.json())
        .then(data2 => console.log(data2))
      } else {
        console.log('did not update mongodb due to missing url')
      }
      
    })
    .catch(err => console.log(err))
  }

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
        <div className="name">{plant.plantName}</div>
        <div className="picture">
          <Image src={plant.pictures ? plant.pictures[plant.pictures.length - 1].url : "/images/plantIcon.png"} alt="plant picture" width="200px" height="200px" />
          <h3>Planted: {plant.plantedDate.slice(0,10)}</h3>
        </div>
        <div className="picture-carousel"> {/* change to carousel of images */}
          {plant.pictures ? 
          plant.pictures.map(picture => {
            return <Image key={picture._id} src={picture.url} alt="plant" width="50px" height="50px" />
          })
          : "no pictures yet, upload some!"
        }
        </div> 
        <div className="water">need to setup a sweet calendar with water symbols</div>
        <div className="buttons">
          <div><input type="file" onChange={(event)=> setImage(event.target.files[0])}></input><button onClick={uploadImage}>Add Photo</button></div>
          <button>Edit</button> {/*bring up a pop up to rename, change planted date, delete water dates, delete pictures, change date of a picture? */}
          {isDeleting ? <button>DELETING...</button> : <button onClick={() => deletePlant(plant)}>Delete</button>}
          <button>Water</button>
          <button>Harvest</button>
        </div>
      </Plant>
    )
  }
}