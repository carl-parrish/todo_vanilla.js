var todoList = {
 todos: [],
 displayAll: function() {
   console.log('My Todos:');
   if (this.todos.length){
     this.todos.map(function(todo){
       let flag = todo.completed ? "(X) ": '( ) ';
       console.log(flag + todo.todoText);
     });
   }else{
     console.log('Your todolist is empty!');
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

const displayTodosButton = document.getElementById('btn_display');
const toggleAllButton    = document.getElementById('btn_toggleAll');
const addButton          = document.getElementById('btn_add');

displayTodosButton.addEventListener('click', function(){
  todoList.displayAll();
});

toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();
});

addButton.addEventListener('click', function(){
  let addTodoInput = document.getElementById('txt_addTodoInput');
  todoList.addTodo(addTodoInput.value);
  addTodoInput.value = '';
});