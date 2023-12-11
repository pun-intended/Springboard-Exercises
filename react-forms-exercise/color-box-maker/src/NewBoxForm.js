
import "./NewBoxForm.css"
import React, { useState } from "react"




function NewBoxForm({newBox}){
    const INITIAL_STATE = {
        width: "",
        height: "",
        color: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleChange = evt => {
        const { name, value } = evt.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        newBox(formData);
        setFormData(INITIAL_STATE);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="width">Width:</label>
            <input name="width" onChange={handleChange} value={formData.width}></input>
            <label htmlFor="height">Height:</label>
            <input name="height" onChange={handleChange} value={formData.height}></input>
            <label htmlFor="color">Color:</label>
            <input name="color" onChange={handleChange} value={formData.color}></input>
            <button className="formButton" >Submit</button>
        </form>
    )
};

export default NewBoxForm;