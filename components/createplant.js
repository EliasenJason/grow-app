import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'
import Image from 'next/image'

//TODO: replace form element below with styled component and make it pretty

export default function CreatePlantForm() {
    const [imageSrc, setImageSrc] = useState()
    const [dataForDatabase, setdataForDatabase] = useState({})
    const userEmail = useUser().user.email

    useEffect(() => console.log(dataForDatabase),[dataForDatabase])
    //when file is changed it is set to state and readAsDataURL so it can be displayed
    const handleFileChange = (changeEvent) => {
        const reader = new FileReader()
        reader.onload = (onLoadEvent) => {
            setImageSrc(onLoadEvent.target.result)
        }
        reader.readAsDataURL(changeEvent.target.files[0])
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdataForDatabase(values => ({...values, [name]: value}))
    }
    
    //sends the picture to cloudinary and sets the url to the picture into dataForDatabase state
    //TODO send data at the end to mongoDB and redirect to active page
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        
        const fileInput = form.elements.file

        const formData = new FormData()
        formData.append('file', fileInput.files[0])
        formData.append('upload_preset', 'my_uploads');
        console.log('uploading: ', ...formData)
        const data = await fetch(process.env.CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(json => {
            setdataForDatabase(values => ({...values, pictureUrl: json.url, userEmail: userEmail}))
        })
    }
    return (
        <form method="post" onSubmit={handleOnSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required onChange={handleChange}/>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" required onChange={handleChange}/>
            <input type="file" name="file" onChange={handleFileChange} />
            {imageSrc ? <Image src={imageSrc} height="250px" width="250px" alt="loaded image"/> : <p>no image</p>}
            <button type="submit">Create Plant</button>
        </form>
    )
}