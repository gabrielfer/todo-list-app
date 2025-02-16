import express from 'express';
import crypto from 'crypto';

const router = express.Router();

let todos = []; // In memory data

router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: 'Task is required!' });

    const newTodo = {
        id: crypto.randomUUID(),
        task,
        completed: false,
        date: new Date().toISOString()
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ message: 'Todo not found!' });

    if (task !== undefined) {
        todo.task = task;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.status(200).json({ message: 'Todo updated', todo });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const initalLength = todos.length;

    todos = todos.filter(todo => todo.id !== id);

    if (todos.length === initalLength) {
        res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Todo deleted!' });
});

export default router;