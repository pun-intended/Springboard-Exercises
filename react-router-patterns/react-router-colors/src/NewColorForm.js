import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewColorForm = ({addColor}) => {

    const navigate = useNavigate()

    const INITIAL_STATE = {
        name: "",
        rgb: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE)
   
    const handleSubmit = (evt) => {
        evt.preventDefault();
        addColor(formData)
        setFormData(INITIAL_STATE)
        navigate('/colors');

   } 
   const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(fData => ({
        ...fData,
        [name]: value
    }));
    }
    return(
   <div className='NewColorForm'>
        <form onSubmit={handleSubmit} action='./colors'>
            <label htmlFor='name'>Name:</label>
            <input name="name" type="text" onChange={handleChange}></input><br />
            <label htmlFor="color">Color:</label>
            <input name="color" type="color" onChange={handleChange}></input>
            <button>Submit</button>
        </form>
    </div>
   )
}

export default NewColorForm