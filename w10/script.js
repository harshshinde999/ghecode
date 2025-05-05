// DOM Elements
const todoList = document.getElementById('todoList');
const newTodoInput = document.getElementById('newTodo');
const addTodoBtn = document.getElementById('addTodoBtn');

// Load todos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Add todo event listeners
addTodoBtn.addEventListener('click', addTodo);
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        createTodoElement(todo);
    });
}

// Save todos to localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get all todos from localStorage
function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

// Create a todo element
function createTodoElement(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.dataset.id = todo.id;

    todoItem.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.title}</span>
        <div class="todo-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Add event listeners
    const checkbox = todoItem.querySelector('.todo-checkbox');
    const editBtn = todoItem.querySelector('.edit-btn');
    const deleteBtn = todoItem.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));
    editBtn.addEventListener('click', () => startEditing(todoItem, todo));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    todoList.appendChild(todoItem);
}

// Add a new todo
function addTodo() {
    const title = newTodoInput.value.trim();
    if (!title) return;

    const todos = getTodos();
    const newTodo = {
        id: Date.now(),
        title,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);
    createTodoElement(newTodo);
    newTodoInput.value = '';
}

// Toggle todo completion status
function toggleTodo(id, completed) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = completed;
        saveTodos(todos);
        const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (completed) {
            todoItem.classList.add('completed');
        } else {
            todoItem.classList.remove('completed');
        }
    }
}

// Start editing a todo
function startEditing(todoItem, todo) {
    const todoText = todoItem.querySelector('.todo-text');
    const todoActions = todoItem.querySelector('.todo-actions');
    const currentText = todoText.textContent;

    const editForm = document.createElement('div');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
        <input type="text" value="${currentText}">
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
    `;

    todoText.replaceWith(editForm);
    todoActions.style.display = 'none';

    const input = editForm.querySelector('input');
    input.focus();

    // Save changes
    editForm.querySelector('.save-btn').addEventListener('click', () => {
        updateTodo(todo.id, input.value.trim(), todoItem);
    });

    // Cancel editing
    editForm.querySelector('.cancel-btn').addEventListener('click', () => {
        editForm.replaceWith(todoText);
        todoActions.style.display = 'flex';
    });

    // Handle Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateTodo(todo.id, input.value.trim(), todoItem);
        }
    });
}

// Update a todo
function updateTodo(id, newTitle, todoItem) {
    if (!newTitle) return;

    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = newTitle;
        saveTodos(todos);
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = newTitle;

        const editForm = todoItem.querySelector('.edit-form');
        editForm.replaceWith(todoText);
        todoItem.querySelector('.todo-actions').style.display = 'flex';
    }
}

// Delete a todo
function deleteTodo(id) {
    const todos = getTodos();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
    
    const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
    todoItem.remove();
}

// Show error message
function showError(message) {
    alert(message);
} 