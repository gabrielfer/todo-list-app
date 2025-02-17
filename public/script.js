document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    async function fetchTodos() {
        try {
            const res = await fetch('/api/todos');
            if (!res.ok) throw new Error('Error during todos search');

            const todos = await res.json();
            taskList.innerHTML = '';

            todos.forEach(todo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${todo.task}</span>
                    <button class="delete" onclick="deleteTodo('${todo.id}')">❌</button>
                `;
                taskList.appendChild(li);
            });
        } catch (err) {
            console.error('❌ Error during load todos:', err);
        }
    }

    fetchTodos();
});