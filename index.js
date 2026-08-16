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

function doneTask(id) {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

const main = document.getElementById("mainView");
function renderTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    main.innerHTML = "";
    let n = 0;
    tasks.forEach(task => {
        main.innerHTML += `
            <div class="todo">
                <button onclick="doneTask(${task.id})" class="doneBtn" title="mark as done">Done</button>
                <p>${task.content}</p>
            </div>                
        `;
        n++;
    });
    if (n < 1) {
        main.innerHTML = `
            <div class="todo">
                <p>Add a Task to Get Started...</p>
            </div>
        `;
    }
}

const addBtn = document.getElementById("addBtn");
document.getElementById("addTask").addEventListener("click", () => {
    tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
    const task = {
        id: tasks.length + 1,
        content: document.getElementById("task").value.trim()
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
document.addEventListener("DOMContentLoaded", renderTasks);