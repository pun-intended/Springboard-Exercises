/*
Assignment Specifications:

- Add a new todo (by submitting a form)
- Mark a todo as completed (cross out the text of the todo)
- Remove a todo

- save your todos in localStorage
- Ensure that when the page refreshes, the todos remain
*/

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector('input[name = "task"]');
const taskList = document.querySelector("ul.taskList");

var allListElements = localStorage.getItem("allLis")

// If there exists a set of LI elements, set it as the contents of the UL
if (allListElements){
    taskList.innerHTML = allListElements;
}

// Add click event listeners to UL element for both buttons and list items
taskList.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON"){
        event.target.parentElement.remove();
    } else if (event.target.tagName === "LI") {
        event.target.classList.toggle("complete");
    }
    localStorage.setItem("allLis", taskList.innerHTML);
})

// Create and return a list item with innerText set as argument passed in 
// as "task", append remove button.
function createToDo(task){
    let newLi = document.createElement("li");
    newLi.innerText = task;
    newLi.classList.add("todoItem")
    let newBtn = document.createElement("button");
    newBtn.innerText = "X";
    newLi.appendChild(newBtn)
    return newLi;
}

// Add given list item to list passed in as argument
function addToDo(listItem, list){
    list.append(listItem);
    localStorage.setItem("allLis", list.innerHTML);
}

// Add the user input to task list in the form of a todo line item
taskForm.addEventListener("submit",  function(event){
    event.preventDefault();
    item = createToDo(taskName.value);
    baseList = document.querySelector("ul")
    addToDo(item, baseList);
})
