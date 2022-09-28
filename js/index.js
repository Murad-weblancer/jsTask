const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
tasks.forEach((task) => {
    const taskCss = task.done ? "task-title task-title--done" : "task-title";
    const textHtml = `
      <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
              <span class="${taskCss}">${task.text}</span>
              <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                </button>
                <button type="button" data-action="delete" class="btn-action btnDelete">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                </button>
              </div>
            </li>
      `;
    tasksList.insertAdjacentHTML("beforeend", textHtml);
});
// addTask

form.addEventListener("submit", addTask);
function addTask(e) {
  e.preventDefault();
  const taskInputValue = taskInput.value;
  const newTask = {
    id: Date.now(),
    text: taskInputValue,
    done: false,
  };
  tasks.push(newTask);
  saveLocalStore();
  const taskCss = newTask.done ? "task-title task-title--done" : "task-title";
  const textHtml = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${taskCss}">${newTask.text}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18" />
              </button>
              <button type="button" data-action="delete" class="btn-action btnDelete">
                <img src="./img/cross.svg" alt="Done" width="18" height="18" />
              </button>
            </div>
          </li>
    `;
  tasksList.insertAdjacentHTML("beforeend", textHtml);
  taskInput.value = "";
  taskInput.focus();
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

tasksList.addEventListener("click", deleteTask);
function deleteTask(e) {
  if (e.target.dataset.action === "delete") {
    const perenNode = e.target.closest(".list-group-item");
    const id = Number(perenNode.id);
    tasks = tasks.filter((task) => task.id !== id);
    saveLocalStore();
    perenNode.remove();
    if (tasksList.children.length === 1) {
      emptyList.classList.remove("none");
    }
  }
}

tasksList.addEventListener("click", doneTask);
function doneTask(e) {
  if (e.target.dataset.action === "done") {
    const perenNode = e.target.closest(".list-group-item");
    const id = Number(perenNode.id);
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done;
    saveLocalStore();
    const textTask = perenNode.querySelector(".task-title");
    textTask.classList.toggle("task-title--done");
  }
}

function saveLocalStore() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
