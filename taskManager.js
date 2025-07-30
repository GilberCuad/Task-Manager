const buttonTheme = document.getElementById("button_theme");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskInput = taskForm.elements["input"];
const currentTheme = localStorage.getItem("theme");
const darkTheme = document.body.classList.toggle("dark");
loadTask()


// function form

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = taskInput.value;

  if (task) {
    taskList.append(createElementTask(task));
    saveLocalStorage(task)
    taskInput.value = "";
  }
})

// function create task

function createElementTask(task) {
  const list = document.createElement("li");
  list.textContent = task;

  list.append(createButtons("✖️", "delete-btn"));
  list.append(createButtons("✍️", "edit-btn"));

  return list
}

// function create buttons for edit or delete

function createButtons(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn
}

// This function used the parent delegation (ul) for capture the event according to the click on any child element.

taskList.addEventListener("click", (event) => {
  // Make sure this element contains a class
  // With event.target we can already know which element was clicked.
  if (event.target.classList.contains("delete-btn")) {
    deleteTask(event.target.parentElement)
  } else if (event.target.classList.contains("edit-btn")) {
    editTask(event.target.parentElement);
  }
})

function deleteTask(taskItem) {
  if (confirm("¿Estás seguro de eliminar esta tarea? 🤨")) {
    taskItem.remove();
    updateLocalStorage();
  }
}

function editTask(taskItem) {
  const newEditTask = prompt("Edita la tarea: " + taskItem.firstChild.textContent + "🖊️");
  if (newEditTask !== null) {
    taskItem.firstChild.textContent = newEditTask;
    updateLocalStorage();
  }
}

// Using localStorage webApi

function saveLocalStorage(task) {
  const taskStorage = JSON.parse(localStorage.getItem("task") || "[]");
  taskStorage.push(task);
  localStorage.setItem("task", JSON.stringify(taskStorage));
}

// The browser is instructed to read the data stored in the localstorage in order to be able to inject them

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("task") || "[]");
  tasks.forEach((task) => {
    taskList.appendChild(createElementTask(task))
  })
}


// For function to show the last saved changes when refreshing the page.

function updateLocalStorage() {
  // Capture the current status of the tasks
  // It's converted to array with Array.from and with map we get the texts
  const taskUpdate = Array.from(taskList.querySelectorAll("li")).map((li) => li.firstChild.textContent); //  Brings all tasks created from this container
  localStorage.setItem("task", JSON.stringify(taskUpdate))
}


buttonTheme.addEventListener("click", () => {
  const lightTheme = document.body.classList.toggle("light");
  const theme = document.body.classList.contains(darkTheme) ? darkTheme : lightTheme;

  if (buttonTheme.textContent.includes("Theme 🌞")) {
    buttonTheme.textContent = "Theme 🌃"
    localStorage.setItem("theme", "dark")
  } else {
    buttonTheme.textContent = "Theme 🌞";
    localStorage.setItem("theme", "light")
  }

  localStorage.setItem("theme", theme);

})

if (currentTheme === "dark") {
  document.body.classList.add("dark");
}

