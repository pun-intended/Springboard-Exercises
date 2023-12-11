import React, { useState } from "react"
import Todo from "./Todo.js"
import NewTodoForm from "./NewTodoForm.js"
import {v4 as uuid} from 'uuid'

function TodoList(){
    const [todos, setTodos] = useState([])

    function addTodo(data){
        const newItem = {
            task: data.task,
            id: uuid()
        }
        setTodos([...todos, newItem])
    }

    function removeTodo(id){
        const filteredTodos = todos.filter((t) => t.id !== id)
        setTodos([...filteredTodos])
    }

    return (
        <div className="TodoList">
            <NewTodoForm addTodo={addTodo} />
            {todos.map(t => {return(
                <Todo task={t.task} id={t.id} remove={removeTodo} key={t.id}/>
            )})}
        </div>
    )
}

export default TodoList


