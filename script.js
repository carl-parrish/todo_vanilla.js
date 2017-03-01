"use strict";


const viewSection = document.getElementById('viewSection');
const todosUl = document.querySelector('ul');
//const todosUl = document.createElement('ul');


var todoList = {
 todos: [],
 displayAll: function() {
     todosUl.innerHTML = '';
   if (this.todos.length){
       document.querySelector('h3').innerHTML = '';
     this.todos.map(function(todo){
       let flag = todo.completed ? "(X) ": '( ) ';
       let todoLi = document.createElement('li');
       todoLi.textContent = flag + todo.todoText;
       todosUl.appendChild(todoLi);
     });
   }else{
     viewSection.insertAdjacentHTML('afterbegin', '<h3>Your todolist is empty!</h3>');
   }
  },
  addTodo: function(textValue) {
    this.todos.push({
      todoText: textValue,
      completed: false
    });
    this.displayAll();
  },
  changeTodo: function(index, newTextValue) {
    this.todos[index].todoText = newTextValue;
    this.displayAll();
  },
  deleteTodo: function(index) {
    this.todos.splice(index, 1);
    this.displayAll();
  },
  toggleCompleted: function(index) {
    let current = this.todos[index];
    current.completed = !(current.completed);
    this.displayAll();
  },
  toggleAll: function(){
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
const deleteButton       = document.getElementById('btn_delete');
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

deleteButton.addEventListener('click', function(){
    let position = document.getElementById('num_deletePosition');
    todoList.deleteTodo(position.valueAsNumber);
    position.value = '';
});

toggleButton.addEventListener('click', function(){
    let position = document.getElementById('num_togglePosition');
    todoList.toggleCompleted(position.valueAsNumber);
    position.value = '';
});

window.onload = todoList.displayAll();
