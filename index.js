const taskName = document.querySelector("#task-name");
// console.log(taskName)

const description = document.querySelector("#description");
// console.log(description)

const assignedTo = document.querySelector("#assigned-to");
// console.log(assignedTo);

const taskDate = document.querySelector("#taskDate");
// console.log(taskDate.value);

// const assignment = document.querySelector("#assigned-to");
// console.log(assignment.value);

const status = document.querySelector("#status-range");
// console.log(status.value);

const form = document.querySelector("#submit");
// console.log(form)

// MODAL SELECTORS
const taskNameModal = document.querySelector("#task-name-modal");
// console.log(taskNameModal);

const descriptionModal = document.querySelector("#description-modal");
// console.log(descriptionModal);

const assignedToModal = document.querySelector("#assigned-to-modal");
// console.log(assignedToModal);

const taskDateModal = document.querySelector("#taskDate-modal");
// console.log(taskDateModal);

const statusModal = document.querySelector("#status-range-modal");
// console.log(status.value);

const formModal = document.querySelector("#submit-modal");
// console.log(formModal);

// Error messages form
const errorName = document.getElementById("error-taskName");
// console.log(errorName);
const errorDesc = document.getElementById("error-description");
// console.log(errorDesc);

const taskCards = document.getElementById("taskCards");
// console.log(taskCards);

// Error messages modal
const errorNameModal = document.getElementById("error-taskName-modal");
// console.log(errorNameModal);

const errorDescModal = document.getElementById("error-description-modal");
// console.log(errorDesc);

const taskCardsModal = document.getElementById("taskCards-modal");
// console.log(taskCardsModal);

// <-- FORM LOGIC -->
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log("something");
  validationForm();
});

description.addEventListener("input", () => {
  const change = document.querySelector("#placeholder");
  change.style.display = "none";

  const lettercount = (document.getElementById("description").onkeyup =
    function () {
      document.getElementById(
        "the-count"
      ).innerHTML = `${this.value.length} / 250`;
    });
});

const validationForm = () => {
  let valid = false;

  const max = 30;
  const min = 5;

  const taskNameLength = taskName.value.length;

  const nameValue = taskName.value;
  //   console.log(nameValue);

  let regexTask = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/;
  let regexDesc = /^.{250}$/;

  if (taskNameLength > max) {
    errorName.innerText = "This name is too long";
  } else if (!regexTask.test(taskName.value)) {
    errorName.innerText =
      "This only accepts characters from A to Z and numbers from 0 - 9";
  } else if (taskNameLength < min) {
    errorName.innerText = "This name is too short, minimum 5 characters";
  } else {
    dataForm();
  }

  // if(!regexDesc.test(description.value)){
  //     errorDesc.innerText = "This field is too long"
  //     console.log('field too long');
  // }

  //   console.log(valid);
};

let tasksData = [];
// {
//   name: "wash car",
//   date: "2023-08-21",
//   assignedTo: "Jed",
//   status: "In progress",
// },
// {
//   name: "wash car on the morning4567890",
//   date: "2023-08-21",
//   assignedTo: "Jed",
//   status: "In progress",
// },
const dataForm = () => {
  tasksData.push({
    name: taskName.value,
    description: description.value,
    assignedTo: assignedTo.value,
    date: taskDate.value,
    status: parseInt(status.value),

    // status: taskStatus.value,
  });
  displayTask();
  //   console.log(tasksData);
  localStorage.setItem("data", JSON.stringify(tasksData));
};

// console.log(tasksData);

// MODAL

let selectedTask = 0;

formModal.addEventListener("submit", (event) => {
  event.preventDefault();

  //   console.log(this);
  //   console.log(event);
  //   console.log("something");
  validationModal(event);
});

descriptionModal.addEventListener("input", () => {
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
  let valid = false;

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
    dataFormModal();
  }
};

const dataFormModal = () => {
  //   console.log(selectedTask);
  tasksData.map((task, index) => {
    // console.log(task);
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
  //   console.log(tasksData);
};

// let any = taskCards
// console.log(any)
const displayTask = () => {
  taskCards.innerHTML = "";
  tasksData.map((task, index) => {
    // console.log(typeof task.status);
    let status =
      task.status === 0
        ? "To do"
        : task.status === 1
        ? "In Progress"
        : "Review";
    // console.log(status);
    return (taskCards.innerHTML += `
        <div 
        id=${index}
        onClick= editTask(${index})
        >
            <button
            type="button"
            class="btn btn-primary m-3"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            >
                <h4 class="text-start">${task.name}:</h4>
                <h6 class="text-start">${task.date}</h6>
                <h6 class="text-start">${task.assignedTo}</h6>
                <h6 class="text-start">${status}</h6>
            </button>
        </div>
        `);
  });
};

const editTask = (taskPosition) => {
  selectedTask = taskPosition;
  let task = tasksData[taskPosition];
  //   console.log(task.assignedTo);

  taskNameModal.value = task.name;
  descriptionModal.value = task.description;
  assignedToModal.value = task.assignedTo;
  taskDateModal.value = task.date;
  statusModal.value = task.status;

  const placeholder = document.querySelector("#placeholder-modal");
  placeholder.style.display = "none";

  const lettercount = (document.getElementById("description-modal").onchange =
    function () {
      document.getElementById(
        "the-count-modal"
      ).innerHTML = `${descriptionModal.value.length} / 250`;
    });

    lettercount()
};
// displayTask();

const deleteTask = () => {
  console.log();
  //   someArray.splice(x, 1);
  console.log(selectedTask);
  tasksData.splice(selectedTask, 1);
  localStorage.setItem("data", JSON.stringify(tasksData));
  // console.log(tasksData);
  displayTask();
};

(() => {
  tasksData = JSON.parse(localStorage.getItem("data")) || [];
  //   console.log(tasksData);
  displayTask();
})();

// tasksData = []
// console.log(tasksData);
