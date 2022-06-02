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
  }
  h3 {
    margin: 0 auto;
    border: solid black 1px;
    text-align: center;
  }
  .picture-carousel {
    grid-area: picture-carousel;
    border: solid black 1px;
    padding: .2em; 
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
const SmallPicture = styled.div`
  display: inline-block;
  overflow: 'hidden';
  border: ${props => props.active ? "solid green 4px" : "solid white 4px"};
  margin-right: .2em;
  width: 60px;
  height: 60px;
`

export default function PlantContainer({plant}) {
  const [ isDeleting, setIsDeleting ] = useState(false)
  const [ isDeleted, setIsDeleted ] = useState(false)
  const [ upLoadImage, setUpLoadImage ] = useState('')
  const [ displayedImage, setDisplayedImage] = useState(plant.pictures ? plant.pictures[plant.pictures.length - 1].url : "/images/plantIcon.png")
  const [ pictures, setPictures ] = useState(plant.pictures)

  const uploadImage = () => {
    console.log('uploadImage()')
    const data = new FormData()
    data.append('file', upLoadImage)
    data.append('upload_preset', 'plant_picture')
    data.append('cloud_name', 'dzxhltwmz')
    console.log(data)
    fetch(process.env.CLOUDINARY_UPLOAD_URL, {
      method:'post',
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      console.log('sending data url to backend: ', data.url)
      console.log('sending plant id to backend:', plant._id)
      if (data.url) {
        setDisplayedImage(data.url)
        if (pictures) {
          setPictures([
            ...pictures,
            {date: 'date holder', url: data.url, _id: 'will find out on reload', cloudinaryId: 'unknown'},
          ])
        } else {
          setPictures([
            {date: 'date holder', url: data.url, _id: 'will find out on reload', cloudinaryId: 'unknown'},
          ])
        }
        console.log(pictures)
        return fetch('/api/mongoDB/addPhoto', {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ 
            'url': data.url,
            'id': plant._id,
            'cloudinaryId': data.public_id
          })
        })
        .then(res => res.json())
        .then(data2 => console.log('this one?', data2))
      } else {
        console.log('did not update mongodb due to missing url')
      }
      
    })
    .catch(err => console.log('error:', err))
  }

  const deletePlant = async ({_id}) => {
    console.log('deletePlant()')
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
    //TODO delete picture out of cloudinary if deletedCount response is true.
    setIsDeleting(false)
  }
  if (isDeleted) {
    return <></>
  } else {
    return (
      <Plant key={plant._id}>
        <div className="name">{plant.plantName}</div>
        <div className="picture">
          <Image src={displayedImage} alt="plant picture" width="200px" height="200px" objectFit="cover" />
          <h3>Planted: {plant.plantedDate.slice(0,10)}</h3>
        </div>
        <div className="picture-carousel"> {/* change to carousel of images */}
          {pictures ? 
            pictures.map(picture => {
            return <SmallPicture key={picture._id} active={displayedImage === picture.url}><Image src={picture.url} alt="plant" width="100%" height="100%" onClick={() => setDisplayedImage(picture.url)} /></SmallPicture>
          })
          : "no pictures yet, upload some!"
        }
        </div> 
        <div className="water">watering calendar</div>
        <div className="buttons">
          <div>
            <input type="file" onChange={(event)=> setUpLoadImage(event.target.files[0])}></input>
            <button onClick={uploadImage} disabled={upLoadImage ? false : true}>Add Photo</button>
          </div>
          <button>Edit</button> {/*bring up a pop up to rename, change planted date, delete water dates, delete pictures, change date of a picture? */}
          {isDeleting ? <button>DELETING...</button> : <button onClick={() => deletePlant(plant)}>Delete</button>}
          <button>Water</button>
          <button>Harvest</button>
        </div>
      </Plant>
    )
  }
}