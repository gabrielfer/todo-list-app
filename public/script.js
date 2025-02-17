const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
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

    addTaskBtn.addEventListener('click', async () => {
        const task = taskInput.value.trim();
        if (!task) return alert('Type a task!');

        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task })
            });

            if (!res.ok) throw new Error('Error adding task');

            taskInput.value = '';
            fetchTodos();
        } catch (err) {
            console.error('❌ Error adding task:', err);
        }
    });

    window.deleteTodo = async (id) => {
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Error deleting task');

            fetchTodos();
        } catch (err) {
            console.error('❌ Error deleting task:', err);
        }
    };

    



    fetchTodos();
});