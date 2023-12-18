import React from 'react'
import { Link, useParams } from 'react-router-dom'

const DogList = ({list}) => {
    const imagePath = "../public/";

    return(
        <div>
            {list.map((dog) => {
            return(
                <div>
                    <img src={`${imagePath}${dog.src}.jpg`} />
                    <h2>{dog.name}</h2>
                    <h3>{dog.age}</h3>
                </div>
            )
            })}
        </div>
    )
}

export default DogList