//* Buttons
const createButton = document.querySelector(".createButton");
const confirmButton = document.querySelector(".confirmButton");
const cancelButton = document.querySelector(".cancelButton");

//* Inputs
const taskInput = document.querySelector("#taskInput");
const dateInput = document.querySelector("#dateInput");
const tagInput = document.querySelector("#tagsInput");
const createSectionTagList = document.querySelector(".TagsList");

dateInput.valueAsDate = new Date();
//* Sections
const taskCreatingSection = document.querySelector(".creatingSection");
const topSection = document.querySelector(".topSection");

const taskList = document.querySelector(".tasksList");

//* Events
createButton.addEventListener("click", showAndHideCreationSection);
cancelButton.addEventListener("click", () => {
  clareInputs();
  showAndHideCreationSection();
});

const tagsList = [];

confirmButton.addEventListener("click", () => {
  if (tagsList.length == 0) {
    tagsList.push(tagInput.value);
  }
  saveTaskToLocalStorage(taskInput.value, dateInput.value, tagsList);

  createTask(taskInput.value, dateInput.value, tagsList);

  showAndHideCreationSection();
});

tagInput.addEventListener("keydown", (e) => {
  if (e.code == "Enter" || e.keyCode == 13) {
    tagsList.push(tagInput.value);

    const singleTag = createTaskTags(tagInput.value);
    createSectionTagList.append(singleTag);

    tagInput.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const localTasks = getTaskFromLocalStorage();

  for (const task of localTasks) {
    createTask(task.taskTitle, task.taskDate, task.taskTags);
  }
});

function showAndHideCreationSection() {
  if (getComputedStyle(taskCreatingSection).display === "none") {
    taskCreatingSection.style.display = "flex";
  } else {
    taskCreatingSection.style.display = "none";
  }
}

function getTaskFromLocalStorage() {
  return JSON.parse(localStorage.getItem("unCompleteTaskList") || "[]");
}

function createTask(title, date, tags) {
  const taskLi = createSingleTaskItem(title, date, tags);
  taskList.append(taskLi);
  clareInputs();
}

function createSingleTaskItem(title, date, tags) {
  const taskLi = document.createElement("li");

  // * Task Container That holds all task Information
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("taskContainer");

  // * Task CheckBox
  const taskCheckBox = createCheckBox();
  taskContainer.append(taskCheckBox);

  // * Task Title and date
  const taskDetails = createTaskDetails(title, date);
  taskContainer.append(taskDetails);

  // * taskTags
  const taskTags = createTags(tags);
  taskContainer.append(taskTags);

  taskLi.append(taskContainer);

  return taskLi;
}

function saveTaskToLocalStorage(title, date, tags) {
  const tasksFromLocalStorage = getTaskFromLocalStorage();

  const taskObject = {
    id: Math.floor(Math.random() * 1000),
    taskTitle: title,
    taskDate: date,
    taskTags: tags,
  };

  tasksFromLocalStorage.push(taskObject);

  localStorage.setItem(
    "unCompleteTaskList",
    JSON.stringify(tasksFromLocalStorage)
  );
}

function createCheckBox() {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "Taskcheckbox");
  return checkBox;
}

function createTaskDetails(title, date) {
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("taskDetails");
  const taskTitle = document.createElement("h4");
  taskTitle.innerText = title;
  taskDetails.append(taskTitle);

  const taskDate = document.createElement("p");
  taskDate.innerText = date;
  taskDetails.append(taskDate);

  return taskDetails;
}

function createTags(tags) {
  const tagsUl = document.createElement("ul");
  tagsUl.classList.add("taskTagsUL");

  tags.forEach((element) => {
    const tagItem = createTaskTags(element);

    tagsUl.append(tagItem);
  });

  return tagsUl;
}

function createTaskTags(tagName) {
  let tagItem = document.createElement("li");
  let tagDiv = document.createElement("div");
  tagDiv.classList.add("tagContainer");
  tagDiv.innerText = tagName;
  tagItem.append(tagDiv);
  return tagItem;
}

function clareInputs() {
  taskInput.value = "";
  tagInput.value = "";

  createSectionTagList.innerHTML = "";
  tagsList.pop();
}
