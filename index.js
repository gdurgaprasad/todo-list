const copyRight = document.getElementById("copyright");
const copyRightText = document.createTextNode(
  `© ${new Date().getFullYear()} Copyright`
);
copyRight.appendChild(copyRightText);

const form = document.getElementById("task-form");
const input = document.getElementById("new-task");
const addBtn = document.querySelector("button #add-task");
const filterInput = document.querySelector("input#filter-tasks");
const taskList = document.querySelector("ul.collection");
const clrBtn = document.querySelector(".clr-btn");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clrBtn.addEventListener("click", clearTasks);
  filterInput.addEventListener("keyup", filterTasks);
}

function getTasks() {
  let tasks;
  if (JSON.parse(localStorage.getItem("tasks")) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "collection-item";
      const inputValue = document.createTextNode(task);
      li.appendChild(inputValue);

      //APPEND LINK TO LI
      const a = document.createElement("a");
      a.classList.add("secondary-content");
      const icon = `<i class="fa fa-remove"></i>`;
      a.innerHTML = icon;
      li.appendChild(a);

      //APPEND LI TO UL
      taskList.appendChild(li);
    });
  }
}

function addTask(event) {
  if (input.value) {
    //CREATE LI ELEMENT
    const li = document.createElement("li");
    li.className = "collection-item";
    const inputValue = document.createTextNode(input.value);
    li.appendChild(inputValue);

    //APPEND LINK TO LI
    const a = document.createElement("a");
    a.classList.add("secondary-content");
    const icon = `<i class="fa fa-remove"></i>`;
    a.innerHTML = icon;
    li.appendChild(a);

    //APPEND LI TO UL
    taskList.appendChild(li);

    saveTaskToLocalStorage(input.value);

    input.value = "";
    event.preventDefault();
  }
}

function removeTask(e) {
  if (e.target.parentElement.className.includes("secondary-content")) {
    if (confirm("Are you sure?")) {
      const parentElement = e.target.parentElement.parentElement;
      parentElement.remove();
      removeTaskFromLocalStorage(parentElement.textContent);
    }
  }
}

function clearTasks() {
  if (confirm("Are you sure?")) {
    taskList.innerHTML = "";

    //FASTER
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  clearLocalStorage();
}

function filterTasks(e) {
  const value = e.target.value.trim().toLowerCase();

  document.querySelectorAll(".collection-item").forEach(item => {
    const textContent = item.textContent;
    if (textContent.toLowerCase().indexOf(value) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function saveTaskToLocalStorage(task) {
  let tasks;
  if (JSON.parse(localStorage.getItem("tasks")) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
  let tasks;
  if (JSON.parse(localStorage.getItem("tasks")) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((item, index) => {
    if (item === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearLocalStorage() {
  localStorage.removeItem("tasks");
  // localStorage.clear();
}
