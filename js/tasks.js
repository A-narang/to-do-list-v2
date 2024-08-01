// to represent a task with a 
// - (string) description
// - (date) date creates
// - (string) category
// - (boolean) complete

class Task {
    constructor(description, category) {
        this.description = description;
        this.dateCreated = new Date();
        this.category = category;
        this.complete = false;
    }

    // determines if a task is overdue
    overdue() {
        today = new Date();
        return this.dateCreated.getFullYear !== today.getFullYear
            || this.dateCreated.getMonth !== today.getMonth
            || this.dateCreated.getDay !== today.getDay
            && !this.complete;

    }
}

// globals
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const tabLinks = document.querySelectorAll(".tablinks");
const addTask = document.getElementById("add-to-do");
const taskList = document.getElementById("task-list");

renderTasks();


// EVENT LISTENERS

// change view between add category and to-do-list
tabLinks.forEach(button => {
    button.addEventListener("click", (event) => {
        if (event.target.id === "category") {
            document.getElementById("manage-categories").hidden = false;
            document.getElementById("today's-to-do").hidden = true;
        }

        if (event.target.id === "today") {
            document.getElementById("manage-categories").hidden = true;
            document.getElementById("today's-to-do").hidden = false;
        }

    });
});

// ddd new task to list
addTask.addEventListener("click", (event) => {
    if (document.getElementById("input").value !== "" ) {
        let newTask = new Task(document.getElementById("input").value, categoriesSelect.value);
        document.getElementById("input").value = "";
        categoriesSelect.value = "";
        tasks.push(newTask);
        updateTasks();

        console.log(newTask);
        console.log("task added")
    }
})

// check or delete tasks
taskList.addEventListener("click", (event) => {
    console.log(event.target.value);
    if (event.target.value === "check") {
        checkTask(event.target.name);
    }
    if (event.target.value === "delete") {
        deleteTask(event.target.id);
    }
})

// FUNCTIONS 

// update tasks to local storage 
function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"))
    console.log("local storage tasks updated")
    renderTasks();
}

// renders html for list of tasks
function renderTasks() {
    let tasksHTML = "";
    let t = tasks.filter((t) => t.category === "" && !t.overdue && !t.complete);
    tasksHTML = renderTasksHelper(t, tasksHTML)
    for (let c = 0; c < categories.length; c++) {
        t = tasks.filter((t) => t.category === categories[c] && !t.overdue && !t.complete);
        if (t.length > 0) {
            tasksHTML += `<h1>${categories[c]}</h1>`;
            tasksHTML = renderTasksHelper(t, tasksHTML)
        }
    }
    tasksHTML += `<h1>complete</h1>`;
    t = tasks.filter((t) => !t.overdue && t.complete);
    tasksHTML = renderTasksHelper(t, tasksHTML)
    //tasksHTML += `<h1>overdue</h1>`;
    //t = tasks.filter(t.overdue);
    //tasksHTML = renderTasksHelper(t, tasksHTML)
    taskList.innerHTML = tasksHTML;
}

// renders html for list of given tasks
function renderTasksHelper(list, tasksHTML) {
    for (let i = 0; i < list.length; i++) {
        let checked = list[i].complete ? "checked" : "";
        tasksHTML += `
    <div class="checkbox">
        <input type="checkbox" value="check" name="${list[i].dateCreated}" ${checked}>
        <label for="${list[i].dateCreated}">${list[i].description}</label>
        <button class="delete-btn" value="delete" id="${list[i].dateCreated}">x</button>
    </div>`
    }
    return tasksHTML
}

// deletes task with given date
function deleteTask(date) {
    let taskIndex = tasks.findIndex((t) => t.dateCreated === date);
    if (taskIndex == -1) {
        console.log("task not found")
    } else {
        tasks.splice(taskIndex, 1);
        updateTasks();
        console.log("task deleted");
    }
}

// checks or unchecks task with given date
function checkTask(date) {
    let taskIndex = tasks.findIndex((t) => t.dateCreated === date);
    if (taskIndex == -1) {
        console.log("task not found")
    } else {
        tasks[taskIndex].complete = !tasks[taskIndex].complete;
        updateTasks();
        console.log("check task");
    }
}