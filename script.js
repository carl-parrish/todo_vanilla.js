"use strict";

const viewSection = document.getElementById('viewSection');
const todosUl = document.querySelector('ul');

var todoList = {
 todos: [],
 displayAll() {
     todosUl.innerHTML = '';
   if (this.todos.length){
       document.querySelector('h3').innerHTML = '';
     this.todos.map((todo,indx,arr,todoList) =>{
       let flag = todo.completed ? "(X) ": '( ) ';
       let todoLi = document.createElement('li');
       todoLi.id = indx;
       todoLi.textContent = flag + todo.todoText + ' ';
       todoLi.appendChild(this.createDeleteButton());
       todosUl.appendChild(todoLi);
     });
   }else{
     viewSection.insertAdjacentHTML('afterbegin', '<h3>Your todolist is empty!</h3>');
   }
  },
  createDeleteButton(){
     let deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.className = 'deleteButton';
     return deleteButton;
  },
  addTodo(textValue){
    this.todos.push({
      todoText: textValue,
      completed: false
    });
    this.displayAll();
  },
  changeTodo(index, newTextValue) {
    this.todos[index].todoText = newTextValue;
    this.displayAll();
  },
  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.displayAll();
  },
  toggleCompleted(index) {
    let current = this.todos[index];
    current.completed = !(current.completed);
    this.displayAll();
  },
  toggleAll(){
      /*
     Case 1: If everything's true, make everything false.
     Case 2: Otherwise make everything true.
       */
    let todosArray = this.todos;
    let completedTodos = todosArray.filter(current=> current.completed === true);
    let bool = completedTodos.length !== todosArray.length;
    todosArray.map(current=> current.completed = bool);
    this.displayAll();
  }
};

// Setup Buttons
const toggleAllButton    = document.getElementById('btn_toggleAll');
const addButton          = document.getElementById('btn_add');
const editButton         = document.getElementById('btn_edit');
const toggleButton       = document.getElementById('btn_toggle');

// Event Listeners
toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();
});

addButton.addEventListener('click', function(){
  let addTodoInput = document.getElementById('txt_addTodoInput');
  todoList.addTodo(addTodoInput.value);
  addTodoInput.value = '';
});

editButton.addEventListener('click', function(){
    let position  = document.getElementById('num_EditPosition');
    let content   = document.getElementById('txt_TodoEdit');
    todoList.changeTodo(position.valueAsNumber, content.value);
    position.value = '';
    content.value  = '';
});

toggleButton.addEventListener('click', function(){
    let position = document.getElementById('num_togglePosition');
    todoList.toggleCompleted(position.valueAsNumber);
    position.value = '';
});

todosUl.addEventListener('click', (event) =>{
    let myTarget = event.target;
    let position = parseInt(myTarget.parentNode.id);
    if (myTarget.className === 'deleteButton'){
        todoList.deleteTodo(position);
    }
});

window.onload = todoList.displayAll();