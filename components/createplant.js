import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'
import Image from 'next/image'

//TODO: replace form element below with styled component and make it pretty

export default function CreatePlantForm({setNewPlantForm}) {
    const [newPlant, setNewPlant] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const userEmail = useUser().user.email

    useEffect(() => console.log('state changed:', newPlant),[newPlant])
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewPlant(oldPlant => ({
            ...oldPlant,
            [name]: value,
            userEmail: userEmail
        }))
    }
    
    //TODO send data at the end to mongoDB and redirect to active page
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const res = await fetch('/api/mongoDB/createPlant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlant)
        })
        const data = await res.json()
        console.log(data)
        setIsLoading(false)
        setNewPlantForm(false)
    }
    return (
        <form method="post" onSubmit={handleOnSubmit}>
            <label htmlFor="plantName">Name</label>
            <input id="plantName" name="plantName" type="text" required onChange={handleChange}/>
            <label htmlFor="plantedDate">Date</label>
            <input id="plantedDate" name="plantedDate" type="date" required onChange={handleChange}/>
            {isLoading ? <p>Sending Data</p> : <button type="submit">Create Plant</button>}
        </form>
    )
}