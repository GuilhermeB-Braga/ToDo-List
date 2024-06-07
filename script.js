// Dom Variables

const taskInput = document.querySelector("#addTaskInput")
const addTaskButton = document.querySelector(".iconWrapper")

const taskList = document.querySelector(".tasksList")

// Initializating Variables

let tasksArr = JSON.parse(localStorage.getItem("tasksArr")) || []

// Functions

function createTask (){

    let taskValue = taskInput.value

    if(!taskValue){


        taskInput.focus()
        return

    }else{

        let newTask = {
            TaskContent: taskValue,
            TaskStatus: false
        }
        
        tasksArr.push(newTask)
        localStorage.setItem("tasksArr", JSON.stringify(tasksArr))
        
        location.reload()
    }


}

function viewList() {

    tasksArr.forEach((task, index)=>{

        let li = document.createElement("li")

        li.setAttribute("class", "taskWrapper")

        li.innerHTML = `

            <div class="task">

                <p class="taskTitle">${task.TaskContent}</p>

            </div>

            <div class="checkBox">

                <i class="hidden ph ph-check"></i>

            </div>

        `

        taskList.appendChild(li)

        const checkBox = li.querySelector(".checkBox")
        const checkedIcon = li.querySelector(".ph-check")
        const taskContainer = li.querySelector(".task")
        
        if(task.TaskStatus === true){
            taskContainer.classList.toggle("checked")
            checkBox.classList.toggle("checked")
            checkedIcon.classList.toggle("hidden")
        }

        checkBox.addEventListener("click", ()=>{
            taskContainer.classList.toggle("checked")
            checkBox.classList.toggle("checked")
            checkedIcon.classList.toggle("hidden")
            if(task.TaskStatus === false){
                task.TaskStatus = true
            }else{
                task.TaskStatus = false
            }
            localStorage.setItem("tasksArr", JSON.stringify(tasksArr))
        })

        taskContainer.addEventListener("dblclick", (event)=>{
            event.preventDefault()
            removeTask(index)
        })


    })
}

function removeTask(taskIndex){
    console.log(taskIndex);
    tasksArr.splice(taskIndex, 1)
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr))
    location.reload()
    
}

// AddEventListeners

addTaskButton.addEventListener("click", createTask)

document.addEventListener("DOMContentLoaded", viewList)
