import React from 'react'
import { useParams } from 'react-router-dom'

const DogDetails = ({dogs}) => {
    const params = useParams()
    const dog = dogs.find(({ name }) =>  name === params.name)
    console.log(dog)
    return(
        <div>
            <img src={`../${dog.src}.jpg`} />
            <h2>{dog.name}</h2>
            <h3>{dog.age}</h3>
        </div>
    )
}

export default DogDetails