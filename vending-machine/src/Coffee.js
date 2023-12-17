import React from 'react'
import { Link } from 'react-router-dom'

const Coffee = () => {
    return(
        <div className="Coffee">
            <h2>Mmmmm, caffeine</h2>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default Coffee