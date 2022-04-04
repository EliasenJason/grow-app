import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'
import Image from 'next/image'

//TODO: replace form element below with styled component and make it pretty

export default function CreatePlantForm() {
    const [imageSrc, setImageSrc] = useState()
    const [dataForDatabase, setdataForDatabase] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const userEmail = useUser().user.email

    useEffect(() => console.log('state changed:', dataForDatabase),[dataForDatabase])
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
    
    //TODO send data at the end to mongoDB and redirect to active page
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        //send to picture to cloudinary and add url to dataForDatabase
        const form = event.currentTarget
        const fileInput = form.elements.file
        const formData = new FormData()
        formData.append('file', fileInput.files[0])
        formData.append('upload_preset', 'my_uploads');
        console.log('uploading to cloudinary: ', ...formData) //1
        const cloudinaryFetch = fetch(process.env.CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(json => {
            setdataForDatabase(values => ({...values, pictureUrl: json.url, userEmail: userEmail}))
            console.log('file sent to cloudinary with url of:', json.url )
            sendDataToDatabase({...dataForDatabase, pictureUrl: json.url, userEmail: userEmail})
            setIsLoading(false)
        })
    }

    const sendDataToDatabase = (data) => {
        console.log('sending data to mongodb: ', data)
        setIsLoading(true)
        fetch('http://localhost:3000/api/mongoDB/createPlant', {
            method:"POST", 
            body: JSON.stringify({...data})
        })
        .then(res => {
            console.log('response from mongoDB: ', res)
            setIsLoading(false)
        })
    }
    return (
        <form method="post" onSubmit={handleOnSubmit}>
            <label htmlFor="userName">Name</label>
            <input id="userName" name="userName" type="text" required onChange={handleChange}/>
            <label htmlFor="plantedDate">Date</label>
            <input id="plantedDate" name="plantedDate" type="date" required onChange={handleChange}/>
            <input type="file" name="file" onChange={handleFileChange} />
            {imageSrc ? <Image src={imageSrc} height="250px" width="250px" alt="loaded image"/> : <p>no image</p>}
            {isLoading ? <p>Sending Data</p> : <button type="submit">Create Plant</button>}
        </form>
    )
}