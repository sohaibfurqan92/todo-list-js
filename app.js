//Element Variables
const form = document.querySelector('#task-form');
const inputField = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filterInput = document.querySelector('#filter');
const clearTasks = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){
  form.addEventListener('submit', addTask);

  // Event Delegation
  taskList.addEventListener('click',removeTasks);

  // Filter Tasks
  filterInput.addEventListener('keyup',filterTasks);
}

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
  alert('Task added!');
  //clear input field
  inputField.value='';

  e.preventDefault();
}

function removeTasks(e){
if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
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

