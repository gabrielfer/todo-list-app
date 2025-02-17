import Todo from '../models/Todo.js';

class TodoService {
    static async getAllTodos() {
        try {
            return await Todo.getAll();
        } catch (error) {
            console.error('❌ Error retrieving todos:', error);
            throw new Error('Database operation failed');
        }
    }

    static async createTodo(task) {
        try {
            return await Todo.create(task);
        } catch (error) {
            console.error('❌ Error creating todo:', error);
            throw new Error('Database operation failed');
        }
    }

    static async updateTodo(id, task, completed) {
        try {
            const updatedTodo = await Todo.update(id, task, completed);
            if (!updatedTodo) return null;  // ✅ Properly handle not found cases
            return updatedTodo;
        } catch (error) {
            console.error('❌ Error updating todo:', error);
            throw new Error('Database operation failed');
        }
    }

    static async deleteTodo(id) {
        try {
            const deleted = await Todo.delete(id);
            if (!deleted) return null;  // ✅ Properly handle not found cases
            return true;
        } catch (error) {
            console.error('❌ Error deleting todo:', error);
            throw new Error('Database operation failed');
        }
    }
}

export default TodoService;
