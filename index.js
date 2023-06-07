//GENERAL VARIABLES

const STATUS_MAPPING = {
  0: "To do",
  1: "In Progress",
  2: "Review",
  3: "Done",
};

let errorForm = false;

let tasksData = [];

let selectedTask = 0;

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

// ERROR MESSAGE SELECTORS
const errorName = document.getElementById("error-taskName");

// const taskCards_0 = document.getElementById("taskCards-0");
// const taskCards_1 = document.getElementById("taskCards-1");
// const taskCards_2 = document.getElementById("taskCards-2");
// const taskCards_3 = document.getElementById("taskCards-3");

// ERROR MESSAGE MODAL SELECTORS
const errorNameModal = document.getElementById("error-taskName-modal");

// <-- FORM LOGIC -->

form.addEventListener("submit", (event) => {
  event.preventDefault();
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

  const { error, message } = validateTaskName(taskName.value, 5, 25);

  if (error) {
    errorName.innerHTML = message;
    errorForm = true;
  } else {
    errorName.innerHTML = "";
    errorForm = false;
  }
});

description.addEventListener("input", () => {
  const placeholder = document.querySelector("#placeholder");
  if (!description) {
  }
  placeholder.style.display = "none";

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
  tasksData = [newTask, ...tasksData];
  displayTask();

  localStorage.setItem("data", JSON.stringify(tasksData));
  clearFields();
};

const doneStatus = (taskDone) => {
  //   const doneButton = document.getElementById(`done-button-${taskDone}`);
  //   console.log(doneButton);
  //   console.log(tasksData);

  tasksData.filter((task, index) => {
    index === taskDone && (task.status = 3);
  });

  //   doneButton.setAttribute("disabled", false);
  //   console.log(doneButton);
  //   doneButton.disabled = true;
  //   console.log(doneButton);
  //   const button = bootstrap.Button.getOrCreateInstance(doneButton);
  //   button.toggle();

  displayTask();
  localStorage.setItem("data", JSON.stringify(tasksData));
};

// MODAL

formModal.addEventListener("submit", (event) => {
  // event.preventDefault();
  updateTaskModal(event);
});

taskNameModal.addEventListener("input", () => {
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

  const { error, message } = validateTaskName(taskNameModal.value, 5, 25);

  if (error) {
    errorNameModal.innerHTML = message;
    errorForm = true;
  } else {
    errorNameModal.innerHTML = "";
    errorForm = false;
  }
});

descriptionModal.addEventListener("input", () => {
  displayPlaceholder();
});

const letterCount = (document.getElementById("description-modal").onkeyup =
  function () {
    document.getElementById(
      "the-count-modal"
    ).innerHTML = `${descriptionModal.value.length} / 250`;
  });

const displayPlaceholder = () => {
  const placeholderModal = document.querySelector("#placeholder-modal");
  if (descriptionModal.value === "") {
    placeholderModal.style.display = "initial";
  } else {
    placeholderModal.style.display = "none";
  }
  letterCount();
};

const editTask = (taskPosition) => {
  selectedTask = taskPosition;

  let task = tasksData[taskPosition];

  taskNameModal.value = task.name;
  descriptionModal.value = task.description;
  assignedToModal.value = task.assignedTo;
  taskDateModal.value = task.date;
  statusModal.value = task.status;

  displayPlaceholder();
};

const updateTaskModal = () => {
  tasksData.filter((task, index) => {
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
};

const deleteTask = () => {
  tasksData.splice(selectedTask, 1);
  localStorage.setItem("data", JSON.stringify(tasksData));
  displayTask();
};

const displayTask = () => {
    // taskCards.innerHTML = "";
  if (tasksData == "") {
    return;
  }
  tasksData.map((task, index) => {
    let status = STATUS_MAPPING[task.status] || "Unknown status";
    const taskCards = document.getElementById(`taskCards-${task.status}`);
    // const taskCard = `${taskCards}-${task.status}`;
    // console.log(taskCard);
    console.log(task.status);
    const disabled = task.status === 3 ? "disabled" : "";
    return (taskCards.innerHTML += `
        <div 
        id=${index}
        style="width: 400px; word-wrap:break-word "
        class="mx-4 position-relative "
        >
            <button
            type="button"
            onClick= editTask(${index})
            data-bs-target="#staticBackdrop"
            data-bs-toggle="modal"
            class="btn btn-primary my-3 w-100"
            > 
                <h4 class="text-start ">${task.name}</h4>   
                <h6 class="text-start"><span class="text-warning">Due date:</span> ${task.date}</h6>
                <h6 class="text-start"><span class="text-warning">Assigned to:</span> ${task.assignedTo}</h6>
                <h6 class="text-start"><span class="text-warning">Status:</span> ${status}</h6>
            </button>
            <button 
            id="done-button-${index}"
            onclick="doneStatus(${index})" 
            class="btn btn-primary 
                bg-warning-subtle 
                text-black
                position-absolute 
                bottom-0
                end-0 
                my-4 
                mx-3"
            data-bs-toggle="button"
            ${disabled} 
            >
                Done
            </button>
        </div>
        `);
  });
};

(() => {
  tasksData = JSON.parse(localStorage.getItem("data")) || [];
  displayTask();
})();
