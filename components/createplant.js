import { useState } from 'react'
import Image from 'next/image'

export default function CreatePlantForm() {
    const [imageSrc, setImageSrc] = useState()
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState()

    //when file is changed set it to state and set to readAsDataURL so it can be displayed
    const handleFileChange = (changeEvent) => {
        const reader = new FileReader()
        reader.onload = (onLoadEvent) => {
            setImageSrc(onLoadEvent.target.result)
        }
        reader.readAsDataURL(changeEvent.target.files[0])
    }
    
    //send picture to cloudinary and form data along with cloudinary url from fetch response to mongoDB
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        
        const fileInput = form.elements.file

        const formData = new FormData()
        formData.append('file', fileInput.files[0])
        formData.append('upload_preset', 'my_uploads');
        console.log('uploading: ', ...formData)
        const data = await fetch('https://api.cloudinary.com/v1_1/dszul57q8/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(json => setCloudinaryImageUrl(json.url))
    }

    return (
        <form method="post" onSubmit={handleOnSubmit}>
            <label htmlFor="type">Type</label>
            <input id="type" name="type" type="text" required />
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" required />
            <input type="file" name="file" onChange={handleFileChange} />
            {imageSrc ? <Image src={imageSrc} alt="loaded image"/> : <p>no image</p>}
            <button type="submit">Create Plant</button>
        </form>
    )
}