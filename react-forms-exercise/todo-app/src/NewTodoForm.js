import React, { useState } from 'react'
import {v4 as uuid} from "uuid"
const INITIAL_STATE = {
    task: ""
}

function NewTodoForm({addTodo}){
    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleSubmit = (evt) => {
        evt.preventDefault()
        addTodo(formData)
        setFormData(INITIAL_STATE)
    }

    const handleChange = evt => {
        const { name, value } = evt.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task</label>
                <input name="task" value={formData.task} onChange={handleChange}></input>
                <button>Add</button>
            </form>
        </div>
    )
}

export default NewTodoForm