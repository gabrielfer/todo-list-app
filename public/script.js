document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // 🟢 Fetch all tasks from the API and display them
    async function fetchTodos() {
        console.log('Fetching tasks from API...');

        try {
            const res = await fetch('/api/todos');
            if (!res.ok) throw new Error(`API returned status ${res.status}`);

            const todos = await res.json();
            console.log('Received tasks:', todos);

            if (!Array.isArray(todos) || todos.length === 0) {
                taskList.innerHTML = '<p>No tasks available.</p>';
                return;
            }

            taskList.innerHTML = ''; // Clear the list before rendering

            todos.forEach(todo => {
                console.log(`Rendering task: ${todo.task}`);

                const li = document.createElement('li');
                if (todo.completed) {
                    li.classList.add('completed');
                }

                li.innerHTML = `
                    <div class="task-container">
                        <input type="checkbox" class="toggle" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                        <span class="task-text" data-id="${todo.id}">${todo.task}</span>
                        <input type="text" class="task-input" value="${todo.task}" data-id="${todo.id}">
                    </div>
                    <div class="action-buttons">
                        <button class="delete" data-id="${todo.id}">🗑️</button>
                    </div>
                `;

                const taskText = li.querySelector('.task-text');
                const taskInput = li.querySelector('.task-input');
                const deleteBtn = li.querySelector('.delete');

                // Enable inline editing when clicking the task text
                taskText.addEventListener('click', () => {
                    taskText.classList.add('editing');
                    taskInput.classList.add('editing');
                    taskInput.focus();
                });

                // Save edited task when user clicks outside or presses Enter
                taskInput.addEventListener('blur', () => saveTaskEdit(taskInput, taskText));
                taskInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        saveTaskEdit(taskInput, taskText);
                    }
                });

                // 🟢 Attach delete functionality using event listener
                deleteBtn.addEventListener('click', () => {
                    deleteTodo(todo.id);
                });

                taskList.appendChild(li);
            });

            console.log('Task list updated successfully!');
        } catch (error) {
            console.error('❌ Error fetching tasks:', error);
        }
    }

    // 🟢 Add a new task
    addTaskBtn.addEventListener('click', async () => {
        const task = taskInput.value.trim();
        if (!task) return alert('Please enter a task!');

        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task })
            });

            if (!res.ok) throw new Error('Error adding task');

            taskInput.value = ''; // Clear input field
            fetchTodos(); // Refresh task list
        } catch (error) {
            console.error('❌ Error adding task:', error);
        }
    });

    // 🟢 Toggle task completion status
    window.toggleTodo = async (id, completed) => {
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed }) // Toggle status
            });

            if (!res.ok) throw new Error('Error updating task status');

            fetchTodos(); // Refresh task list
        } catch (error) {
            console.error('❌ Error updating task:', error);
        }
    };

    // 🟢 Save edited task when user clicks outside or presses Enter
    async function saveTaskEdit(inputField, textField) {
        inputField.classList.remove('editing');
        textField.classList.remove('editing');

        const taskId = inputField.dataset.id;
        const updatedTask = inputField.value.trim();

        if (!updatedTask) {
            alert('Task cannot be empty!');
            fetchTodos(); // Reset UI to previous state
            return;
        }

        textField.textContent = updatedTask; // Update UI immediately

        try {
            const res = await fetch(`/api/todos/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: updatedTask })
            });

            if (!res.ok) throw new Error('Error updating task');

            console.log(`Task updated: ${updatedTask}`);
        } catch (error) {
            console.error('❌ Error updating task:', error);
        }
    }

    // 🟢 Delete a task when clicking the trash icon
    function deleteTodo(id) {  // ✅ Make deleteTodo available in script scope
        fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Error deleting task');
            console.log(`Task deleted: ${id}`);
            fetchTodos(); // Refresh task list
        })
        .catch(error => console.error('❌ Error deleting task:', error));
    }

    // 🟢 Fetch tasks when the page loads
    fetchTodos();
});
