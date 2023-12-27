import React from 'react'
import { Link, useParams } from 'react-router-dom'

const DogList = ({list}) => {
    return(
        <div>
            {list.map((dog) => {
            return(
                <div>
                    <img src={`../${dog.src}.jpg`} />
                    <Link to={`/dogs/${dog.name}`} ><h2>{dog.name}</h2></Link>
                    <h3>{dog.age}</h3>
                </div>
            )
            })}
        </div>
    )
}

export default DogList