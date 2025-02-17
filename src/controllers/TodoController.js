import TodoService from '../service/TodoService.js';

class TodoController {

    static async getAllTodos(req, res, next) {
        try {
            const todos = await TodoService.getAllTodos();
            if (!todos || todos.length === 0) {
                return next({ name: 'NotFoundError', status: 404, details: 'No tasks found' });
            }
            res.status(200).json({ data: todos });
        } catch (error) {
            next({ name: 'DatabaseError', details: error.message });
        }
    }

    static async createTodo(req, res, next) {
        const { task } = req.body;

        if (task === undefined) {
            return next({
                name: 'BadRequestError',
                status: 400,
                details: 'Task is required'
            });
        }

        if (typeof task !== 'string') {
            return next({
                name: 'BadRequestError',
                status: 400,
                details: 'Task must be a string'
            });
        }

        if (task.trim() === '') {
            return next({
                name: 'BadRequestError',
                status: 400,
                details: 'Task cannot be empty'
            });
        }

        try {
            const newTodo = await TodoService.createTodo(task);
            res.status(201).json({ message: 'Task created successfully', data: newTodo });
        } catch (error) {
            next({ name: 'DatabaseError', details: error.message });
        }
    }

    static async updateTodo(req, res, next) {
        const { id } = req.params;
        const { task, completed } = req.body;

        if (task === undefined && completed === undefined) {
            return next({ name: 'BadRequestError', status: 400, details: 'Provide either \'task\' or \'completed\' field for update' });
        }

        if (task !== undefined && typeof task !== 'string') {
            return next({ name: 'BadRequestError', status: 400, details: 'Task must be a string' });
        }

        if (task !== undefined && task.trim() === '') {
            return next({ name: 'BadRequestError', status: 400, details: 'Task cannot be empty' });
        }

        try {
            const updatedTodo = await TodoService.updateTodo(id, task, completed);
            if (!updatedTodo) {
                return next({ name: 'NotFoundError', status: 404, details: 'Task not found' }); // ✅ Properly handle NotFoundError
            }
            res.status(200).json({ message: 'Task updated successfully', data: updatedTodo });
        } catch (error) {
            next({ name: 'DatabaseError', details: error.message });
        }
    }

    static async deleteTodo(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next({ name: 'BadRequestError', details: 'Task ID is required' });
        }

        try {
            const deleted = await TodoService.deleteTodo(id);
            if (!deleted) {
                return next({ name: 'NotFoundError', status: 404, details: 'Task not found or already deleted' }); // ✅ Properly handle NotFoundError
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            next({ name: 'DatabaseError', details: error.message });
        }
    }
}

export default TodoController;