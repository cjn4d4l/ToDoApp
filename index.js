function openDialog(id) {
    document.getElementById(id).showModal();
}

function closeDialog(id) {
    document.getElementById(id).close();
}

const isActive = localStorage.getItem("isActive") ?? false;

if (localStorage.getItem("theme") === "dark") {
    setTheme("dark", "black");
} else {
    setTheme("light", "white");
}

function setTheme(root, header) {
    document.querySelector(":root").style.setProperty("color-scheme", root);
    document.querySelector("header").style.setProperty("background-color", header);
}

document.getElementById("changeTheme").addEventListener("click", () => {
    if (localStorage.getItem("theme") === "dark") {
        setTheme("light", "white");
        localStorage.setItem("theme", "light");
    } else {
        setTheme("dark", "black");
        localStorage.setItem("theme", "dark");
    }
})

let tasks = [];

function countOfDone () {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    let n = 0;
    tasks.forEach(task => {
        if (task.isDone) {
            n++;
        }
    })
    document.getElementById("noofdone").innerHTML = `Completed Tasks: ${n}`;
}

function doneTask(id) {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    tasks.forEach(task => {
        if (task.id == id) {
            task.isDone = true;
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    showCompletedTasks();
    countOfDone();
}

const main = document.getElementById("mainView");
function renderTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    console.log(tasks);
    main.innerHTML = "";
    let n = 0;
    main.innerHTML = `
        <p>To Be Completed</p> <br>
    `;
    tasks.forEach(task => {
        if (!task.isDone) {
            main.innerHTML += `
            <div class="todo">
                <button onclick="doneTask(${task.id})" class="doneBtn" title="mark as done">Done</button>
                <p>${task.content}</p>
            </div>                
        `;
            n++;
        }
    });
    if (n < 1) {
        main.innerHTML = `
            <div class="todo">
                <p>Add a Task to Get Started...</p>
            </div>
        `;
    }
}

const completedTask = document.getElementById("completedTask");
function showCompletedTasks () {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    completedTask.innerHTML = "";
    let n = 0;
    tasks.forEach(task => {
        if (task.isDone) {
            completedTask.innerHTML += `
                <div class="doneTodo">
                    <del>${task.content}</del>
                    <button onclick="deleteTask(${task.id})" class="navBtns">Delete</button>
                </div>
            `;
            n++;
        }
    })
    if (n < 1) {
        completedTask.innerHTML = `
            <div class="todo">
                <p>No Completed Tasks Yet...</p>
            </div>
        `;
    }
}

const addBtn = document.getElementById("addBtn");
document.getElementById("addTask").addEventListener("click", () => {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    console.log(tasks);
    const task = {
        id: tasks.length + 1,
        content: document.getElementById("task").value.trim(),
        isDone: false
    };
    if (task.content.trim() === '') {
        return;
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("task").value = "";
    document.getElementById("wordCount").innerHTML = "0/60";
    renderTasks();
    closeDialog("addDialog");
})

document.getElementById("task").addEventListener("input", () => {
    const task = document.getElementById("task").value;
    document.getElementById("wordCount").innerHTML = `${task.length}/60`;
})

let showTask = false;
const showTaskbtn = document.getElementById("showTasks");
showTaskbtn.addEventListener("click", () => {
    if (showTask) {
        showTaskbtn.innerText = "Hide Completed Tasks";
        completedTask.style.opacity = "1";
        showTask = false;
    } else {
        showTaskbtn.innerText = "Show Completed Tasks";
        completedTask.style.opacity = "0";
        showTask = true;
    }
})

function deleteTask (id) {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showCompletedTasks();
    countOfDone();
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    showCompletedTasks();
    countOfDone();
});