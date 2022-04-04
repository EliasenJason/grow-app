import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'
import Image from 'next/image'

//TODO: replace form element below with styled component and make it pretty

export default function CreatePlantForm() {
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
        }))
    }
    
    //TODO send data at the end to mongoDB and redirect to active page
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        setdataForDatabase(values => ({...values, userEmail: userEmail}))
        sendDataToDatabase({...dataForDatabase, userEmail: userEmail})
        setIsLoading(false)
    }

    const sendDataToDatabase = (data) => {
        console.log('sending data to mongodb: ', data)
        // setIsLoading(true)
        // fetch('http://localhost:3000/api/mongoDB/createPlant', {
        //     method:"POST", 
        //     body: JSON.stringify({...data})
        // })
        // .then(res => {
        //     console.log('response from mongoDB: ', res)
        //     setIsLoading(false)
        // })
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