// Dom Variables

let tasks = document.querySelectorAll(".taskWrapper")

const taskInput = document.querySelector("#addTaskInput")
const addTaskButton = document.querySelector(".iconWrapper")

const taskList = document.querySelector(".tasksList")

const menuBtn = document.querySelector("#openMenuBtn")
const asideMenu = document.querySelector(".asideMenu")
const overlay = document.querySelector(".overlay")

const themeColorBtn = document.querySelector(".darkLightMode")
const header = document.querySelector("header")
const tasksSection = document.querySelector(".tasksSection")
const body = document.querySelector("body")

const themeIcon = document.querySelector(".darkLightMode i")
const themeText = document.querySelector(".darkLightMode p")

const searchIcon = document.querySelector(".searchArea i")
const searchInput = document.querySelector(".searchArea input")

// Initializating Variables

let tasksArr = JSON.parse(localStorage.getItem("tasksArr")) || []

let theme = JSON.parse( localStorage.getItem("theme")) || false

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

function openCloseMenu () {
    
    asideMenu.classList.toggle("open")
    overlay.classList.toggle("hidden")
    tasksSection.classList.toggle("onRight")
    header.classList.toggle("onRight")
    
    
}

function changeTheme (){

    themeColorBtn.classList.toggle("darkOn")
    
    if(theme){
        
        theme = false

        themeIcon.classList.replace("ph-sun", "ph-moon")
        themeText.textContent = "Dark Mode"
        
        localStorage.setItem("theme", theme)

        }else{
            theme = true

        themeIcon.classList.replace("ph-moon", "ph-sun")
        themeText.textContent = "Light Mode"

            localStorage.setItem("theme", theme)
            }
            
            body.classList.toggle("darkTheme")

}

function openSearchInput (){
    searchInput.value = ""
    searchInput.classList.toggle("active")
    searchInput.focus()
}

function searchTasks (){

    let searchValue = searchInput.value.toLowerCase()

    tasks.forEach((task)=>{

    let taskTitle = task.querySelector(".taskTitle").textContent.toLowerCase()

    if(taskTitle.includes(searchValue)){

        task.style.display = `flex`

    }else{

        task.style.display = `none`

    }


    })
    
    
}


// AddEventListeners

addTaskButton.addEventListener("click", createTask)

document.addEventListener("DOMContentLoaded", viewList)

menuBtn.addEventListener("click", openCloseMenu)

overlay.addEventListener("click", openCloseMenu)

themeColorBtn.addEventListener("click", changeTheme)

searchIcon.addEventListener("click", openSearchInput)

searchInput.addEventListener("input", searchTasks)

document.addEventListener("DOMContentLoaded", ()=>{

    tasks = document.querySelectorAll(".taskWrapper")
    
    if(theme == true){
        body.classList.add("darkTheme")
    }else{
        body.classList.remove("darkTheme")
    }
})
