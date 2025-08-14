const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");

// Event listener for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTask(taskText);
    taskInput.value = "";
  }
});

// Add a new task
function addTask(text) {
  const li = document.createElement("li");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = text;
  textInput.readOnly = true;
  textInput.classList.add("funnel-sans-text");

  const div = document.createElement("div");
  div.classList.add("buttons");

  // Add buttons for updating and deleting
  const updateButton = document.createElement("button");
  updateButton.textContent = "Edit";
  updateButton.classList.add("funnel-sans-text");

  updateButton.addEventListener("click", () => {
    if (textInput.readOnly) {
      textInput.readOnly = false;
      textInput.focus();
      updateButton.textContent = "Save";
      updateButton.classList.add("save-btn");
    } else {
      textInput.readOnly = true;
      updateButton.classList.remove("save-btn");
      updateButton.textContent = "Edit";
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("funnel-sans-text");
  deleteButton.addEventListener("click", () => li.remove());

  // Append buttons to the buttons div
  div.appendChild(updateButton);
  div.appendChild(deleteButton);

  li.appendChild(textInput);
  li.appendChild(div);

  // Add the list item to the task list
  taskList.appendChild(li);
}
