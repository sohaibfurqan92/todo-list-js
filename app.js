//Element Variables
const form = document.querySelector('#task-form');
const inputField = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filterInput = document.querySelector('#filter');
const clearTasksBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){

  // DOM Loaded
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit', addTask);

  // Event Delegation
  taskList.addEventListener('click',removeTasks);

  // Filter Tasks
  filterInput.addEventListener('keyup',filterTasks);

  //Clear Tasks
  clearTasksBtn.addEventListener('click',clearTasks);
}

// get tasks
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  } else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li= document.createElement('li');
    //Add class
    li.className='collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.setAttribute('href','#');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fas fa-times"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}
// Add tasks
function addTask(e){
  if(inputField.value===''){
    alert('Please enter a task name');
  }

  const li= document.createElement('li');
  //Add class
  li.className='collection-item';
  li.appendChild(document.createTextNode(inputField.value));
  const link = document.createElement('a');
  link.setAttribute('href','#');
  link.className='delete-item secondary-content';
  link.innerHTML='<i class="fas fa-times"></i>';
  li.appendChild(link);
  taskList.appendChild(li);

  // Persist task to Local Storage
  addToLocalStorage(inputField.value);
  alert('Task added!');
  //clear input field
  inputField.value='';

  e.preventDefault();
}

function removeTasks(e){
if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}
  e.preventDefault();
}

function filterTasks(e){
  // Get text being typed
  const text = filterInput.value.toLowerCase();

  //loop through list items
  document.querySelectorAll('.collection-item').forEach(function(item){
    const task = item.firstChild.textContent.toLowerCase();
    if(task.indexOf(text)!=-1){
      item.style.display='block';
    } else{
      item.style.display='none';
    }
  });
}

function clearTasks(e){
    if(taskList.childElementCount===0){
      alert('No Tasks Added');
      return;
    }
    else{
      if(confirm('Are you sure?')){
        while(taskList.firstChild){
          taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear()
      }
  }
  //OR taskList.innerHTML ='';
  e.preventDefault();
}


function addToLocalStorage(task){
  let tasks;
  // check Local Storage
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  } else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
      //update local storage
      localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeFromLocalStorage(listItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
    alert('No Tasks Added');
  }
  else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(task==listItem.textContent){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));

}
