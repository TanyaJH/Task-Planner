const taskName = document.querySelector("#task-name")
console.log(taskName)

const description = document.querySelector("#description")
console.log(description)

const form = document.querySelector("#submit")
console.log(form)

const errorName = document.getElementById('error-taskName')
console.log(errorName);
const errorDesc = document.getElementById('error-description')
console.log(errorDesc);

form.addEventListener("submit", (e) => {
   e.preventDefault()
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
let regexTask = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
let regexDesc = /^.{250}$/



if (taskNameLength > max){
    errorName.innerText = "This name is too long"
}else if (!regexTask.test(taskName.value)) {
    errorName.innerText = "This only accepts characters from A to Z"
}

// if(!regexDesc.test(description.value)){
//     errorDesc.innerText = "This field is too long"
//     console.log('field too long');
// }


console.log(valid);



}