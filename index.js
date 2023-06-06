//GENERAL VARIABLE

const STATUS_MAPPING = {
  0: "To do",
  1: "In Progress",
  2: "Review",
  3: "Done",
};

let errorForm = false;

let tasksData = [];

// FORM SELECTORS
const taskName = document.querySelector("#task-name");

const description = document.querySelector("#description");

const assignedTo = document.querySelector("#assigned-to");

const taskDate = document.querySelector("#taskDate");

const status = document.querySelector("#status-range");

const form = document.querySelector("#submit");

// MODAL SELECTORS
const taskNameModal = document.querySelector("#task-name-modal");

const descriptionModal = document.querySelector("#description-modal");

const assignedToModal = document.querySelector("#assigned-to-modal");

const taskDateModal = document.querySelector("#taskDate-modal");

const statusModal = document.querySelector("#status-range-modal");

const formModal = document.querySelector("#submit-modal");

// ERROR MESSAGE
const errorName = document.getElementById("error-taskName");

const taskCards = document.getElementById("taskCards");

// ERROR
const errorNameModal = document.getElementById("error-taskName-modal");

const errorDescModal = document.getElementById("error-description-modal");

const taskCardsModal = document.getElementById("taskCards-modal");

// <-- FORM LOGIC -->

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveNewTask();
});

const clearFields = () => {
  form.reset();
};

taskName.addEventListener("input", () => {
  const validateTaskName = (text, minLength, maxLength) => {
    const regexTask = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/;
    let validationResult = {
      error: false,
      message: "",
    };
    if (text.length < minLength) {
      validationResult.error = true;
      validationResult.message = `This name is too short, minimum ${minLength} characters`;
    } else if (text.length > maxLength) {
      validationResult.error = true;
      validationResult.message = `This name is too long, maximum ${maxLength} characters`;
    } else if (!regexTask.test(text)) {
      validationResult.error = true;
      validationResult.message = `This only accepts characters from A to Z and numbers from 0 - 9`;
    }

    return validationResult;
  };

  const { error, message } = validateTaskName(taskName.value, 5, 30);

  if (error) {
    errorName.innerHTML = message;
    errorForm = true;
  } else {
    errorForm = false;
    errorName.innerHTML = "";
  }
});

description.addEventListener("input", () => {
  const change = document.querySelector("#placeholder");
  if (!description) {
  }
  change.style.display = "none";

  const lettercount = (document.getElementById("description").onkeyup =
    function () {
      document.getElementById(
        "the-count"
      ).innerHTML = `${this.value.length} / 250`;
    });
});

const saveNewTask = () => {
  const newTask = {
    name: taskName.value,
    description: description.value,
    assignedTo: assignedTo.value,
    date: taskDate.value,
    status: parseInt(status.value),
  };
  tasksData = [...tasksData, newTask];
  displayTask();

  localStorage.setItem("data", JSON.stringify(tasksData));
  clearFields();
};

// MODAL

let selectedTask = 0;

formModal.addEventListener("submit", (event) => {
  event.preventDefault();
  validationModal(event);
});

descriptionModal.addEventListener("submit", () => {
  const placeholder = document.querySelector("#placeholder-modal");

  placeholder.style.display = "none";

  const lettercount = (document.getElementById("description-modal").onkeyup =
    function () {
      document.getElementById(
        "the-count-modal"
      ).innerHTML = `${this.value.length} / 250`;
    });
});

const validationModal = () => {
  const max = 30;
  const min = 5;

  const taskNameLength = taskNameModal.value.length;

  let regexTask = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/;
  let regexDesc = /^.{250}$/;

  if (taskNameLength > max) {
    errorNameModal.innerText = "This name is too long";
  } else if (!regexTask.test(taskNameModal.value)) {
    errorNameModal.innerText =
      "This only accepts characters from A to Z and numbers from 0 - 9";
  } else if (taskNameLength < min) {
    errorNameModal.innerText = "This name is too short, minimum 5 characters";
  } else {
    saveNewTaskModal();
  }
};

const saveNewTaskModal = () => {
  tasksData.map((task, index) => {
    if (index === selectedTask) {
      task.name = taskNameModal.value;
      task.description = descriptionModal.value;
      task.assignedTo = assignedToModal.value;
      task.date = taskDateModal.value;
      task.status = parseInt(statusModal.value);
    }
  });

  localStorage.setItem("data", JSON.stringify(tasksData));
  displayTask();
  clearFields();
};

const displayTask = () => {
  taskCards.innerHTML = "";

  tasksData.reverse().map((task, index) => {
    let status = STATUS_MAPPING[task.status] || "Unknown status";

    return (taskCards.innerHTML += `
        <div 
        id=${index}
        onClick= editTask(${index})
        style="width: 30%"
        class="mx-4"
        >
            <button
            type="button"
            class="btn btn-primary my-3 w-100"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            >
                <h4 class="text-start w-100">${task.name}</h4>
                <h6 class="text-start"><span class="text-warning">Due date:</span> ${task.date}</h6>
                <h6 class="text-start"><span class="text-warning">Assigned to:</span> ${task.assignedTo}</h6>
                <h6 class="text-start"><span class="text-warning">Status:</span> ${status}</h6>
            </button>
        </div>
        `);
  });
};

const editTask = (taskPosition) => {
  selectedTask = taskPosition;
  console.log(selectedTask);
  let task = tasksData[taskPosition];
  console.log(task);

  taskNameModal.value = task.name;
  descriptionModal.value = task.description;
  assignedToModal.value = task.assignedTo;
  taskDateModal.value = task.date;
  statusModal.value = task.status;

  const placeholder = document.querySelector("#placeholder-modal");
  placeholder.style.display = "none";

  const lettercount = (document.getElementById("description-modal").onkeyup =
    function () {
      document.getElementById(
        "the-count-modal"
      ).innerHTML = `${descriptionModal.value.length} / 250`;
    });

  lettercount();
};

const deleteTask = () => {
  tasksData.splice(selectedTask, 1);
  localStorage.setItem("data", JSON.stringify(tasksData));
  displayTask();
};

(() => {
  tasksData = JSON.parse(localStorage.getItem("data")) || [];
  displayTask();
})();
