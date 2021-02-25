// Define UI vars
const form = document.querySelector(".add-card");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks-btn");

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", deleteAllTasks);
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement("span");
    link.className = "delete-item";
    link.innerHTML =
      '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    //   create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement("span");
    link.className = "delete-item";
    link.innerHTML =
      '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    // Store to Local Storage(LS)
    storeTaskInLocalStorage(taskInput.value);
    // clear input
    taskInput.value = "";
  }
}
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  if (e.target.closest(".delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.closest("li").remove();
      removeTaskFromLocalStorage(e.target.closest("li"));
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteAllTasks(e) {
  e.preventDefault();
  if (confirm("Are You Sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
