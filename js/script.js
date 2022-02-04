

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoDate = document.querySelector(".todo-date");
const todoTime = document.querySelector(".todo-time");
const todoButton = document.querySelector(".todo-button");
const dateButton = document.querySelector(".todo-date");
const timeButton = document.querySelector(".todo-time");
const todoList = document.querySelector(".todo-list");
const dateList = document.querySelector(".date-list");
const timeList = document.querySelector(".time-list");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions
function addTodo(event){

    //Prevent form from submitting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    const todoDate = document.createElement("div");
    const todoTime = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDate.classList.add("date");
    todoTime.classList.add("time");
    
    //Create LI
    const newTodo = document.createElement("li");
    const newDate = document.createElement("div");
    const newTime = document.createElement("div");
    if(todoInput.value === '' || dateButton.value === ''|| timeButton.value === ''){
        alert("Please enter all sections");
    }
    else{
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Add todo to local storage
        saveLocalTodos(todoInput.value);
        saveLocalDates(dateButton.value);
        saveLocalTimes(timeButton.value);

        //Append to list
        todoList.appendChild(todoDiv);
        dateList.appendChild(todoDate);
        timeList.appendChild(todoTime);
    }

    newDate.innerText = dateButton.value;
    newDate.classList.add("date-item");
    todoDiv.appendChild(newDate);

    newTime.innerText = timeButton.value;
    newTime.classList.add("time-item");
    todoDiv.appendChild(newTime);

    //Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Delete trashButton
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Clear values
    todoInput.value = "";
    dateButton.value = "";
    timeButton.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        const date = item.parentElement;
        const time = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        removeLocalDates(date);
        removeLocalTimes(time);
        // removeLocalTodos(todo);

        todo.addEventListener("transitionend", function(){
            todo.remove();
            // date.remove();
            // time.remove();
        });
    }

    //Check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo){

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalDates(date){

    let dates;
    if(localStorage.getItem("dates") === null){
        dates = [];
    }
    else{
        dates = JSON.parse(localStorage.getItem("dates"));
    }

    dates.push(date);
    localStorage.setItem("dates", JSON.stringify(dates));
}

function saveLocalTimes(time){

    let times;
    if(localStorage.getItem("times") === null){
        times = [];
    }
    else{
        times = JSON.parse(localStorage.getItem("times"));
    }

    times.push(time);
    localStorage.setItem("times", JSON.stringify(times));
}


function getTodos(){

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let dates;
    if(localStorage.getItem("dates") === null){
        dates = [];
    }
    else{
        dates = JSON.parse(localStorage.getItem("dates"));
    }

    let times;
    if(localStorage.getItem("times") === null){
        times = [];
    }
    else{
        times = JSON.parse(localStorage.getItem("times"));
    }

    for(let i=0; i<todos.length; i++)
    {
        // //Todo DIV
        const todoDiv = document.createElement("div");
        const todoDate = document.createElement("div");
        const todoTime = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDate.classList.add("date");
        todoTime.classList.add("time");
        
        //Create LI and DIVS
        const newTodo = document.createElement("li");
        const newDate = document.createElement("div");
        const newTime = document.createElement("div");
        newTodo.innerText = todos[i];
        newDate.innerText = dates[i];
        newTime.innerText = times[i];
        newTodo.classList.add("todo-item");
        newDate.classList.add("date-item");
        newTime.classList.add("time-item");
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(newDate);
        todoDiv.appendChild(newTime);

        //Append to list
        todoList.appendChild(todoDiv);

        //Completed button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        //Delete trashButton
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    }
}


function removeLocalTodos(todo){

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalDates(date){

    let dates;
    if(localStorage.getItem("dates") === null){
        dates = [];
    }
    else{
        dates = JSON.parse(localStorage.getItem("dates"));
    }
    const dateIndex = date.children[1].innerText;
    dates.splice(dates.indexOf(dateIndex), 1);
    localStorage.setItem("dates", JSON.stringify(dates));
}

function removeLocalTimes(time){

    let times;
    if(localStorage.getItem("times") === null){
        times = [];
    }
    else{
        times = JSON.parse(localStorage.getItem("times"));
    }
    const timeIndex = time.children[2].innerText;
    times.splice(times.indexOf(timeIndex), 1);
    localStorage.setItem("times", JSON.stringify(times));
}

//Show current time and date
function refreshTime() {
    const timeDisplay = document.getElementById("datetime");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 0);
