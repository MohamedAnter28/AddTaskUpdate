let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");




document.querySelector(".deleteAll").onclick = function (){
  document.querySelector(".ms").classList.add("active");
  document.querySelector(".shadow ").classList.add("active");
}


document.querySelector(".ms div").onclick = (e) => {
  const msElement = document.querySelector(".ms");
  const shadowElement = document.querySelector(".shadow");

  if (e.target.classList.contains("no-delete")) {
    msElement.classList.remove("active");
    shadowElement.classList.remove("active");
  }

  if (e.target.classList.contains("del")) {
    if (tasksDiv.innerHTML !== ""){
    tasksDiv.innerHTML = "";
    window.localStorage.clear()
    msElement.classList.remove("active");
    shadowElement.classList.remove("active");
    document.querySelector(".done-ms").classList.add("active");
    }else{
      msElement.classList.remove("active");
      shadowElement.classList.remove("active");
    }
  }
}




// The Array
let arrayOfTasks = [];

// Check if there Tasks in local storage

if (localStorage.getItem("tasks")){
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

//
getDataFromLocalStorage()


//Add Task
submit.onclick = function (){
  if (input.value !== ""){
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // remove value
  }
}


// click on task element
tasksDiv.addEventListener('click',(e) =>{
  if (e.target.classList.contains("del")){
    // remove element from localStorage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // Task element
  if (e.target.classList.contains("task")){
    toggleStatusTaskWith(e.target.getAttribute("data-id"))
    e.target.classList.toggle("done")
  }
})

function addTaskToArray(taskText){
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // push Task To array of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To page
  addElementsToPageFrom(arrayOfTasks);
  // add Task To local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
  tasksDiv.innerHTML = "";
  // looping 
  arrayOfTasks.forEach((task) => {
    // Create Div
    const div = document.createElement("div");
    div.classList.add("task");
    // check if task done
    if (task.completed === true){
      div.classList.add("done");
    }
    div.setAttribute('data-id',task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create delete button
    const dele = document.createElement("span");
    dele.classList.add("del");
    dele.appendChild(document.createTextNode("Delete"));

    div.appendChild(dele);
    tasksDiv.appendChild(div);
  })
}


function addDataToLocalStorageFrom(arrayOfTasks){
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
  let data = window.localStorage.getItem("tasks");
  if (data){
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks)
  }
}


function deleteTaskWith(taskId){
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}


