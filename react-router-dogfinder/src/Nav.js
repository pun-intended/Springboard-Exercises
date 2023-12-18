import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({dogList}) => {
    const dogList = dogList

    return(
        <ul>
            <li><Link to={`/dogs`}>Home</Link></li>
            {dogList.map((dog) => {
                <li><Link to={`/dogs/${dog.name}`}>{dog.name}</Link></li>
            })}
            
        </ul>
    )
}