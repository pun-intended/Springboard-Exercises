import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({list}) => {
    const dogList = list

    return(
        <ul>
            <li><Link to={`/dogs`}>Home</Link></li>
            {dogList.map((dog) => {
                return <li><Link to={`/dogs/${dog.name}`}>{dog.name}</Link></li>
            })}
            
        </ul>
    )
}

export default Nav