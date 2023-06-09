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

// SEARCH SELECTORS

const search = document.querySelector("#search");

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

const editTaskModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop")
);

// ERROR MESSAGE SELECTORS
const errorName = document.getElementById("error-taskName");

// ERROR MESSAGE MODAL SELECTORS
const errorNameModal = document.getElementById("error-taskName-modal");

// <-- SEARCH LOGIC -->

search.addEventListener("input", (event) => {
  let input, isVisible;

  input = event.target.value.toLowerCase();

  tasksData.forEach((task, index) => {
    const taskButton = document.querySelector(`.task-button-${index}`);

    isVisible =
      task.name.toLowerCase().includes(input) ||
      task.assignedTo.toLowerCase().includes(input);

    taskButton.classList.toggle("d-none", !isVisible);
  });
});

class ResetSearch {
  clearInput(search) {
    return (search.value = "");
  }
}

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

  const { error, message } = validateTaskName(taskName.value, 5, 30);

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
  
  
  localStorage.setItem("data", JSON.stringify(tasksData));
  displayTask();


  clearFields();
  new ResetSearch().clearInput(search);
  window.location.reload()
};

const doneStatus = (taskDone) => {
  console.log(taskDone);
  tasksData.filter((task, index) => {
    index === taskDone && (task.status = 3);
  });

  localStorage.setItem("data", JSON.stringify(tasksData));
  displayTask();
  
  new ResetSearch().clearInput(search);
  window.location.reload()
};

// MODAL

const updateInfoTask = () => {
  updateTaskModal();
};

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

  const { error, message } = validateTaskName(taskNameModal.value, 5, 30);

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
  editTaskModal.hide();
  displayTask();
  new ResetSearch().clearInput(search);
  window.location.reload()
};

const deleteTask = () => {
  tasksData.splice(selectedTask, 1);
  localStorage.setItem("data", JSON.stringify(tasksData));
  displayTask();
  new ResetSearch().clearInput(search);
  window.location.reload()
};

const displayTask = () => {
  if (tasksData == "") {
    return;
  }
  tasksData.map((task, index) => {
    let status = STATUS_MAPPING[task.status] || "Unknown status";
    const taskCards = document.getElementById(`taskCards-${task.status}`);

    const disabled = task.status === 3 ? "d-none" : "";
    return (taskCards.innerHTML += `
        <div 
        id=${index}
        style="width: 275px; word-wrap:break-word "
        class="mx-4 position-relative task-button-${index}"
        >
            <button
            type="button"
            onClick= editTask(${index})
            data-bs-target="#staticBackdrop"
            data-bs-toggle="modal"
            class="btn btn-primary my-3 border-0 w-100"
            > 
                <h4 class="text-start  " style="height: 65px;">${task.name}</h4>   
                <h6 class="text-start "><span class="text-warning" style="width: 95px;">Due date: &emsp;</span> ${task.date}</h6>
                <h6 class="text-start"><span class="text-warning" style="width: 95px;">Assigned to:</span> ${task.assignedTo}</h6>
                <h6 class="text-start"><span class="text-warning">Status: &emsp; &emsp;</span> ${status}</h6>
            </button>
            <button 
            id="done-button-${index}"
            onClick="doneStatus(${index})" 
            class="border-0 
            bg-warning-emphasis 
            text-warning
                position-absolute 
                bottom-0
                end-0 
                my-4 
                mx-3
                ${disabled} 
                "
            data-bs-toggle="button"
            >
            <i class="bi bi-check2-circle" style="font-size: 2.5rem";></i>
            </button>
        </div>
        `);
  });
};

(() => {
  tasksData = JSON.parse(localStorage.getItem("data")) || [];
  displayTask();
})();
