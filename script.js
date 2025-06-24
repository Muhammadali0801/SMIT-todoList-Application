let userValue = document.getElementById("userTask");
let userTaskList = document.getElementById("taskList");

window.onload = showTasks;

function addItem() {
  let userValueTrim = userValue.value.trim();
  if (userValueTrim === "") {
    Swal.fire("Enter a valid Task!");
    return;
  }

  let oldTask = JSON.parse(localStorage.getItem("tasks")) || [];
  oldTask.push(userValueTrim);
  localStorage.setItem("tasks", JSON.stringify(oldTask));
  userValue.value = "";
  showTasks();
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  userTaskList.innerHTML = "";

  tasks.forEach((task, index) => {
    userTaskList.innerHTML += `
      <li>
        ${task}
        <div class="inline-btn">
        <button class="li-btn" onclick="editItem(${index})">Edit</button>
        <button class="li-btn" onclick="delItem(${index})">Delete</button>
        </div>
        </li>  

    `;
  });
}

function delItem(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function editItem(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let updatedValue = prompt("Edit your task:", tasks[index]);
  if (updatedValue !== null && updatedValue.trim() !== "") {
    tasks[index] = updatedValue.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

function delAll() {
  localStorage.removeItem("tasks");
  showTasks();
}
