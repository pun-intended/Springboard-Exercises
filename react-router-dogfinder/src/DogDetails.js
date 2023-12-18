import React from 'react'
import { useParams } from 'react-router-dom'

const DogDetails = ({dogList}) => {
    const dogName = useParams()
    const dog = dogList.find(({ name }) => name === dogName)
    return(
        <div>
            <img src={`${imagePath}${dog.src}.jpg`} />
            <h2>{dog.name}</h2>
            <h3>{dog.age}</h3>
        </div>
    )
}

export default DogDetails