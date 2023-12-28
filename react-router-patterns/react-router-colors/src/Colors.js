import React from 'react'
import { Link } from 'react-router-dom'

const Colors = ({colorList}) => {


    return (
        <div>
            <div className='Colors-add'>
                <Link to="/colors/new"><h2>Add New Color</h2></Link>
            </div>
            <div className='Colors-all'>
                <ul className='Colors-list'>
                <h3>Select a Color</h3>
            {colorList.map((color) => {
                return(
                    <li>
                        <Link to={`/colors/${color.name}`}><h3>{color.name}</h3></Link>
                    </li>
                )
            })}
                </ul>
            </div>
        </div>
    )
}

export default Colors