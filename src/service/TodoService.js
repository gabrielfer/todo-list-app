import todo from '../models/todo.js';

class TodoService {
    static async createTodo(task) {
        try {
            return await todo.create(task);
        } catch (err) {
            console.error('❌ Error during todo creation:', err);
            throw new Error('Error during todo creation');
        }
    }

    static async getAllTodos() {
        try {
            return await todo.getAll();
        } catch (err) {
            console.error('❌ Error during todos search:', err);
            throw new Error('Error during todos search');
        }
    }

    static async updateTodo(id, task, completed) {
        try {
            const updatedTodo = await todo.update(id, task, completed);
            if (!updatedTodo) throw new Error('Todo not found');
            return updatedTodo;
        } catch (err) {
            console.error('❌ Error during todo update:', err);
            throw new Error('Error during todo update');
        }
    }

    static async deleteTodo(id) {
        try {
            const deleted = await todo.delete(id);
            if (!deleted) throw new Error('Todo not found');
            return { message: 'Todo deleted with success!' };
        } catch (err) {
            console.error('❌ Error during todo delete', err);
            throw new Error('Error during todo delete');
        }
    }
}

export default TodoService;