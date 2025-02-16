import TodoService from '../service/TodoService.js';

class TodoController {

    static async getAllTodos(req, res) {
        try {
            const todos = await TodoService.getAllTodos();
            res.status(200).json(todos);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createTodo(req, res) {
        try {
            const { task } = req.body;
            if (!task) {
                return res.status(400).json({ message: 'Task field is required' });
            }

            const newTodo = await TodoService.createTodo(task);
            res.status(201).json(newTodo);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { task, completed } = req.body;
            const updatedTodo = await TodoService.updateTodo(id, task, completed);
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task updated' });
        } catch (err) {
            res.status(500).json({ message: err.message });

        }
    }

    static async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const deletedTodo = TodoService.deleteTodo(id);
            if (!deletedTodo) {
                res.status(404).json({ message: 'Task todo found' });
            }
            res.status(200).json({ message: 'Task deleted with success' });
        } catch (err) {
            res.status(500).json({ message: err.message });

        }
    }
}

export default TodoController;