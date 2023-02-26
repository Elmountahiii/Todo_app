//* Buttons
const createButton = document.querySelector(".createButton");
const confirmButton = document.querySelector(".confirmButton");
const cancelButton = document.querySelector(".cancelButton");

//* Inputs
const taskInput = document.querySelector("#taskInput");
const dateInput = document.querySelector("#dateInput");
const tagInput = document.querySelector("#tagsInput");
const tagList = document.querySelector(".creationTagsList");

//* Sections
const taskCreatingSection = document.querySelector(".creatingSection");
const topSection = document.querySelector(".topSection");

const taskList = document.querySelector(".taskListView ul");

//* Events
createButton.addEventListener("click", showAndHideCreationSection);
cancelButton.addEventListener("click", showAndHideCreationSection);

const tagsList = [];

confirmButton.addEventListener("click", () => {
  createTask(taskInput.value, dateInput.value, tagsList);
});

tagInput.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    tagsList.push(tagInput.value);
    createTag(tagInput.value);
    tagInput.value = "";
  }
});

function showAndHideCreationSection() {
  if (getComputedStyle(taskCreatingSection).display === "none") {
    taskCreatingSection.style.display = "flex";
  } else {
    taskCreatingSection.style.display = "none";
  }
}

function createTag(tagName) {
  let tagItem = document.createElement("li");
  let tagDiv = document.createElement("div");
  tagDiv.classList.add("tagContainer");
  tagDiv.innerText = tagName;
  tagItem.append(tagDiv);
  tagList.append(tagItem);
}

function createTask(title, date, tags) {
  const li = document.createElement("li");
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("taskItem");

  const checkBox = createCheckBox();
  taskContainer.append(checkBox);

  //* Task Details
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("taskDetails");
  const taskTitle = document.createElement("h4");
  const taskDate = document.createElement("h5");
  taskTitle.innerText = title;
  taskDate.innerText = date;
  taskDetails.append(taskTitle);
  taskDetails.append(taskDate);
  taskContainer.append(taskDetails);

  //* Tags Ul
  const taskUl = document.createElement("ul");
  taskUl.classList.add("creationTagsList");

  tags.forEach((tag) => {
    const taskLI = document.createElement("li");
    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tagContainer");
    tagDiv.innerText = tag;
    taskLI.append(tagDiv);
    taskUl.append(taskLI);
  });
  taskContainer.append(taskUl);
  li.append(taskContainer);
  taskList.append(li);

  clareInputs();
}

function createCheckBox() {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "Taskcheckbox");
  return checkBox;
}

function clareInputs() {
  taskInput.value = "";
  dateInput.value = "";

  tagList.innerHTML = "";
}
