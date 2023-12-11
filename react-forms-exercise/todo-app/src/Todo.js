 import "./Todo.css"

 function Todo({task, id, remove}){
    function handleSubmit(evt){
        evt.preventDefault();
        remove(id);
    }
    return(
        <div className="Todo" id={id}>
            <form onSubmit={handleSubmit}>
                <p className="Todo-task">{task}</p><button className="Todo-button">X</button>
            </form>
        </div>
    )
 }

 export default Todo