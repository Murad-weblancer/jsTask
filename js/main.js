const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
let tasks = [];
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach(task=>{
    const taskCss = task.done ? "task-title task-title--done" : "task-title";

    const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${taskCss}">${task.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18" />
        </button>
        <button type="button" data-action="delete" class="btn-action btnDelete">
          <img src="./img/cross.svg" alt="Done" width="18" height="18" />
        </button>
      </div>
    </li>`;
    tasksList.insertAdjacentHTML("beforeend", taskHtml);
})




form.addEventListener("submit", addTask);
function addTask(e) {
  e.preventDefault();
  const taskInputValue = taskInput.value;

  const task = {
    id: Date.now(),
    text: taskInputValue,
    done: false,
  };
  tasks.push(task); 
  saveLocalStore()
  const taskCss = task.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${taskCss}">${task.text}</span>
    <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18" />
      </button>
      <button type="button" data-action="delete" class="btn-action btnDelete">
        <img src="./img/cross.svg" alt="Done" width="18" height="18" />
      </button>
    </div>
  </li>`;
  tasksList.insertAdjacentHTML("beforeend", taskHtml);
  taskInput.value = "";
  taskInput.focus();
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

tasksList.addEventListener("click", deleteTask);
function deleteTask(e) {
  if (e.target.dataset.action !== "delete") return;

  // closest = работает как документ только ищет родителя
  const parenNode = e.target.closest(".list-group-item");

  const id = Number(parenNode.id);

  tasks = tasks.filter(task=>task.id !== id)
  saveLocalStore()
  parenNode.remove();

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

tasksList.addEventListener("click", doneTask);
function doneTask(e) {
  if (e.target.dataset.action !== "done") return
    const parenNode = e.target.closest(".list-group-item");

    const id = Number(parenNode.id)

    const task = tasks.find((task)=>task.id === id)
    task.done = !task.done
    saveLocalStore()

    const taskText = parenNode.querySelector(".task-title");
    taskText.classList.toggle("task-title--done");

}


function saveLocalStore(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}