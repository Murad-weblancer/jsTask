const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
let tasks = [];
console.log(tasks);
if (localStorage.getItem("tasksSave")) {
  tasks = JSON.parse(localStorage.getItem("tasksSave"));
}
tasks.forEach((task) => {
  const taskCss = task.done ? "task-title task-title--done" : "task-title";
  const textHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
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
form.addEventListener("submit", addTasks);
function addTasks(e) {
  e.preventDefault();
  const taskInputValue = taskInput.value;
  const newTask = {
    id: Date.now(),
    text: taskInputValue,
    done: false,
  };
  tasks.push(newTask);
  saveLocalStorage();
  const taskCss = newTask.done ? "task-title task-title--done" : "task-title";
  const textHtml = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
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
  taskInput.value = "";
  taskInput.focus();
  tasksList.insertAdjacentHTML("beforeend", textHtml);
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

tasksList.addEventListener("click", deleteTask);
function deleteTask(e) {
  if (e.target.dataset.action === "delete") {
    const parenNode = e.target.closest(".list-group-item");
    const id = Number(parenNode.id);
    tasks = tasks.filter((task) => task.id !== id);
    saveLocalStorage();
    parenNode.remove();
    if (tasksList.children.length === 1) {
      emptyList.classList.remove("none");
    }
  }
}

tasksList.addEventListener("click", doneTask);
function doneTask(e) {
  if (e.target.dataset.action === "done") {
    const parenNode = e.target.closest(".list-group-item");
    const title = parenNode.querySelector(".task-title");
    const id = Number(parenNode.id);
    const taskDone = tasks.find((task) => task.id === id);
    taskDone.done = !taskDone.done;
    saveLocalStorage();
    title.classList.toggle("task-title--done");
  }
}

function saveLocalStorage() {
  localStorage.setItem("tasksSave", JSON.stringify(tasks));
}
