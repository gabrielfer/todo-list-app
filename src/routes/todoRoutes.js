import express from 'express';
import TodoService from '../service/TodoService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todos = await TodoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ message: 'Task is required!' });
        const newTodo = await TodoService.createTodo(task);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        const updatedTodo = await TodoService.updateTodo(id, task, completed);
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found!' });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TodoService.deleteTodo(id);
        if (!deleted) return res.status(404).json({ message: 'Todo not found!' });
        res.status(200).json({ message: 'Todo deleted with sucess' });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});

export default router;