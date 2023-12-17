import React from 'react'
import { Link } from 'react-router-dom'

const Tea = () => {
    return(
        <div className="Tea">
            <h2>Mmmmm, less caffeine</h2>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default Tea