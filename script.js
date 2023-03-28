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

const completeTaskList = document.querySelector(".completeTasksList");

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

  createTask(taskInput.value, dateInput.value, tagsList, taskList);

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
  const unCompleteTaskList = getTaskFromLocalStorage("unCompleteTaskList");
  const CompleteTaskList = getTaskFromLocalStorage("CompleteTaskList");

  createUnCompleteTaskList(unCompleteTaskList);
  createCompleteTaskList(CompleteTaskList);
});

function showAndHideCreationSection() {
  if (getComputedStyle(taskCreatingSection).display === "none") {
    taskCreatingSection.style.display = "flex";
  } else {
    taskCreatingSection.style.display = "none";
  }
}

function getTaskFromLocalStorage(dataBaseName) {
  return JSON.parse(localStorage.getItem(dataBaseName) || "[]");
}

function createTask(title, date, tags, task, taskChecked, taskEnabled) {
  const taskLi = createSingleTaskItem(
    title,
    date,
    tags,
    taskChecked,
    taskEnabled
  );
  task.append(taskLi);
  clareInputs();
}

function createSingleTaskItem(title, date, tags, taskChecked, taskEnabled) {
  const taskLi = document.createElement("li");

  // * Task Container That holds all task Information
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("taskContainer");

  // * Task CheckBox
  const taskCheckBox = createCheckBox(taskChecked, taskEnabled);
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
  const tasksFromLocalStorage = getTaskFromLocalStorage("unCompleteTaskList");

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

function createCheckBox(taskChecked, taskEnabled) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "Taskcheckbox");
  checkBox.setAttribute("onclick", "changing(event)");
  if (taskChecked == true && taskEnabled) {
    checkBox.setAttribute("checked", "checked");
  }
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

function changing(event) {
  const unCompleteTasks = getTaskFromLocalStorage("unCompleteTaskList");
  const completedTasks = getTaskFromLocalStorage("CompleteTaskList");
  const containerClassName =
    event.target.parentNode.parentNode.parentNode.classList.value;

  if (containerClassName == "tasksList") {
    const taskTitle = event.target.parentNode.children[1].children[0].innerText;

    const taskOBJ = unCompleteTasks.find((task) => {
      return task.taskTitle == taskTitle;
    });

    const newUnCompleteTaskList = unCompleteTasks.filter((task) => {
      return task.id != taskOBJ.id;
    });

    completedTasks.push(taskOBJ);

    localStorage.setItem(
      "unCompleteTaskList",
      JSON.stringify(newUnCompleteTaskList)
    );

    localStorage.setItem("CompleteTaskList", JSON.stringify(completedTasks));

    createCompleteTaskList(getTaskFromLocalStorage("CompleteTaskList"));

    event.target.parentNode.children[1].parentNode.remove();
  }
}

function createUnCompleteTaskList(list) {
  for (const task of list) {
    createTask(
      task.taskTitle,
      task.taskDate,
      task.taskTags,
      taskList,
      false,
      false
    );
  }
}
function createCompleteTaskList(list) {
  completeTaskList.innerHTML = "";
  for (const task of list) {
    createTask(
      task.taskTitle,
      task.taskDate,
      task.taskTags,
      completeTaskList,
      true,
      true
    );
  }
}
