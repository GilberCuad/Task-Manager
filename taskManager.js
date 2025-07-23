const buttonTheme = document.getElementById("button_theme");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskInput = taskForm.elements["input"];
loadTask()


// función para formulario

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = taskInput.value;

  if (task) {
    taskList.append(createElementTask(task));
    saveLocalStorage(task)
    taskInput.value = "";
  }

})

function createElementTask(task) {
  const lista = document.createElement("li");
  lista.textContent = task;
  lista.append(createButtons("✖️", "delete-btn"));
  lista.append(createButtons("✍️", "edit-btn"));
  return lista
}


function createButtons(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn
}

// Se utiliza la delegación padre (ul) para capturar el evento segun el click al cualquier elemento hijo

taskList.addEventListener("click", (event) => {
  console.log(event.target)
  // aseguranos que este elemento contenga una clase
  // con event.target ya podemos saber cual elemento se clickeo
  if (event.target.classList.contains("delete-btn")) {
    deleteTask(event.target.parentElement)
  } else if (event.target.classList.contains("edit-btn")) {
    editTask(event.target.parentElement);
  }

})

function deleteTask(taskItem) {
  if (confirm("¿Estás seguro de eliminar esta tarea?")) {
    taskItem.remove();
  }
}

function editTask(taskItem) {
  const newEditTask = prompt("Edita la tarea: " + taskItem.firstChild.textContent);
  if (newEditTask !== null) {
    taskItem.firstChild.textContent = newEditTask;
  }
}

// usando webApi de localstorage

function saveLocalStorage(task) {
  const taskStorage = JSON.parse(localStorage.getItem("task") || "[]");
  taskStorage.push(task);
  localStorage.setItem("task", JSON.stringify(taskStorage));
}

// con la siguiente funcion se indica al navegador que lea los datos guardados en el localstorage para poderlos inyectar

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("task") || "[]");

  tasks.forEach((task) => {
    taskList.appendChild(createElementTask(task))
  })
}


buttonTheme.addEventListener("click", (e) => {
  const classBackground = e.target.classList.toggle("dark");
})