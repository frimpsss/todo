const addbtn = document.querySelector('.add')
const userInput = document.getElementById("userInput")
const tasks = document.querySelector('.task-section')
const clearbtn = document.querySelector(".clear")
const errMsg = document.querySelector('.message')

let taskNumber = 0
document.querySelector("#total").textContent = taskNumber
// overlay
const overlay = document.querySelector('.overlay')

addbtn.addEventListener('click', main)

window.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
            main()
    }
})
function hideErr(){
    errMsg.textContent = ''
    errMsg.classList.remove('sucess')
    errMsg.classList.remove('fail')
}
// clear all btn
clearbtn.addEventListener('click', function(){
    tasks.innerHTML = ''
    taskNumber = 0
    document.querySelector("#total").textContent = taskNumber
})

document.querySelector("#total").textContent = taskNumber
//reset function to put things to original if error
function reset() {
    userInput.value = ''
}
function main(){
    let enterdTask = userInput.value
    if(enterdTask.length == 0 || enterdTask === ' '){
        errMsg.textContent = "Failed: Input field Empty"
        errMsg.classList.add('fail')
        setTimeout(hideErr, 1000)
        reset()
    }
    else{
    let id = genID()
    localStorage.setItem(id, enterdTask)
    tasks.innerHTML += `
    <div class="task">
    <p>${localStorage.getItem(id)}</p>
    <div>
        <button class="btn edit"><ion-icon name="create-outline"></ion-icon></button>
        <button class="btn delete"><ion-icon name="trash-bin-outline"></ion-icon></button>
    </div>
     </div>
    `
    errMsg.textContent = "Sucess: task added"
    errMsg.classList.add('sucess')
    setTimeout(hideErr, 0900)
    reset()
    taskNumber++
    document.querySelector("#total").textContent = taskNumber
    // set delete and edit task
    const confirmBtn = document.querySelector(".confirm")
    const cancelBtn = document.querySelector(".cancel")
    let newTask = document.querySelector('.new-task')
    const editBtn = document.querySelectorAll('.edit')
    editBtn.forEach(function(edit){
    edit.addEventListener('click', function(e){
        let selectedElement = e.currentTarget.parentElement.parentElement
        overlay.classList.add('dispoverlay')
        confirmBtn.addEventListener('click', function(){
            selectedElement.querySelector('p').textContent = newTask.value
            overlay.classList.remove('dispoverlay')
        })
        cancelBtn.addEventListener('click', function(){
            overlay.classList.remove('dispoverlay')
        })
    })

    
    
    })
    // delete 
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach(function(deletebtn){
        deletebtn.addEventListener('click', function(e){
            let selectedElement = e.currentTarget.parentElement.parentElement
            selectedElement.style.display = "none"
            taskNumber--
            document.querySelector("#total").textContent = taskNumber
        })
    })
    }
    
}
//seting unique id for local storande id

function genID(){
    const chars = ['a','b','c','A','B','C',0,1,2,3]
    let id = 'f'
    for(let i = 0; i < 6; ++i){
        id += chars[Math.floor(Math.random() * chars.length)]
    }

    return id
}






