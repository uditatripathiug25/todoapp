const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskText);

    taskInput.value = "";

    saveTasks();
}


// Create task on the screen
function createTask(taskText, completed = false) {

    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");

    span.textContent = taskText;

    span.onclick = function() {
        li.classList.toggle("completed");
        saveTasks();
    };


    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-btn");


    deleteButton.onclick = function() {

        li.remove();

        saveTasks();
    };


    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}


// Save tasks
function saveTasks() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(li) {

        const task = {
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        };

        tasks.push(task);

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load saved tasks
function loadTasks() {

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(task) {

        createTask(task.text, task.completed);

    });
}


loadTasks();
