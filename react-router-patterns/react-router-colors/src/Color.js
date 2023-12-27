import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Color = ({colors}) =>{
    const params = useParams();
    const navigate = useNavigate()
    const color = colors.find(({name}) => name === params.color)
    return (
        <div className='Color' style={{backgroundColor: `${color.rgb}`}}>
            <h1>This is {`${color.name}`}</h1><br /><br />
            <h1>So Preeeetty</h1>
            <h1>{`${color.rgb}`}</h1>
            <button onClick={() => {navigate("/colors")}}>Go Back</button>
        </div>
    )

}

export default Color