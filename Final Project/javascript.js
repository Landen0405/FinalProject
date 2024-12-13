let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    taskList.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    window.location.href = "taskList.html";
  }
}

function toggleTask(index) {
  const task = taskList[index];
  task.completed = !task.completed;

  if (task.completed) {
    completedTasks.push(task);
    taskList.splice(index, 1);
  }
  saveTasks();
  renderTasks();
}

function moveBackToTasks(index) {
  const task = completedTasks[index];
  task.completed = false;
  taskList.push(task);
  completedTasks.splice(index, 1);
  saveTasks();
  renderCompletedTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function deleteCompletedTask(index) {
  completedTasks.splice(index, 1);
  saveTasks();
  renderCompletedTasks();
}

function saveTasks() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function renderTasks() {
  const taskListElement = document.getElementById('taskList');
  if (!taskListElement) return;

  taskListElement.innerHTML = '';

  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onclick="toggleTask(${index})">
      ${task.text}
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskListElement.appendChild(li);
  });
}

function renderCompletedTasks() {
  const completedListElement = document.getElementById('completedTaskList');
  if (!completedListElement) return;

  completedListElement.innerHTML = '';

  completedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.text}
      <button onclick="moveBackToTasks(${index})">Move Back</button>
      <button onclick="deleteCompletedTask(${index})">Delete</button>
    `;
    completedListElement.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  renderCompletedTasks();
});