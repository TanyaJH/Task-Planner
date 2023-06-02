const taskName = document.querySelector("#task-name")
console.log(taskName)

const description = document.querySelector("#description")
console.log(description)

const form = document.querySelector("#submit")
console.log(form)

const taskDate = document.querySelector("#taskDate")
console.log(taskDate)

const errorName = document.getElementById('error-taskName')
console.log(errorName);
const errorDesc = document.getElementById('error-description')
console.log(errorDesc);

const taskCards = document.getElementById('taskCards')
console.log(taskCards)

form.addEventListener("submit", (e) => {
//    e.preventDefault()
    console.log('something');
    validationForm()
})

description.addEventListener("input", () => {

    const change = document.querySelector('#placeholder')
    change.style.display = 'none'

  const lettercount =  document.getElementById('description').onkeyup = function () {
      document.getElementById('the-count').innerHTML = `${this.value.length} / 250` ;
    };

})




const validationForm = () => {
let valid = false

const max = 30

const taskNameLength = taskName.value.length
let regexTask = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/;
let regexDesc = /^.{250}$/



if (taskNameLength > max){
    errorName.innerText = "This name is too long"
}else if (!regexTask.test(taskName.value)) {
    errorName.innerText = "This only accepts characters from A to Z and numbers from 0 - 9"
}

// if(!regexDesc.test(description.value)){
//     errorDesc.innerText = "This field is too long"
//     console.log('field too long');
// }


console.log(valid);

}

const validationModal = () => {
    let valid = false

    const max = 30
    
    const taskNameLength = taskName.value.length
    let regexTask = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/;
    let regexDesc = /^.{250}$/
    
    
    
    if (taskNameLength > max){
        errorName.innerText = "This name is too long"
    }else if (!regexTask.test(taskName.value)) {
        errorName.innerText = "This only accepts characters from A to Z" 
    }
}

let taskData = [{
    name:"wash car",
    date:"2023-08-21",
    assignedTo:"Jed",
    status:"In progress",
},
{
    name:"wash car",
    date:"2023-08-21",
    assignedTo:"Jed",
    status:"In progress",
},
]
const dataForm = () => {
   data.push({
    name:taskName.value,
    date:taskDate.value,
    // assignedTo:assignedTo.value,
    status:taskStatus.value,
   }) 
}
// let any = taskCards
// console.log(any)
const displayTask = () => {
    taskCards.innerHTML = "";
    taskData.map((task, index) => {
        return(taskCards.innerHTML += `
        <div id=${index}>
        <button
        type="button"
        class="btn btn-primary m-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <h4 class="text-start">${task.name}:</h4>
        <h6 class="text-start">${task.date}</h6>
        <h6 class="text-start">${task.assignedTo}</h6>
        <h6 class="text-start">${task.status}</h6>
      </button>
        </div>
        `)
    })

}

displayTask()