import todo from '../models/todo.js';

class TodoService {
    static async createTodo(task) {
        try {
            return await todo.create(task);
        } catch (err) {
            console.err('❌ Erro ao criar todo:', err);
            throw new Error('Erro ao criar tarefa');
        }
    }

    static async getAllTodos() {
        try {
            return await todo.getAll();
        } catch (err) {
            console.error('❌ Erro ao buscar todos:', err);

            throw new Error('Erro ao buscar tarefas');

        }
    }

    static async updateTodo(id, task, completed) {
        try {
            const updatedTodo = await todo.update(id, task, completed);
            if (!updatedTodo) throw new Error('Tarefa não encontrada');
            return updatedTodo;
        } catch (err) {
            console.error('❌ Erro ao atualizar todo:', err);
            throw new Error('Erro ao atualizar a tarefa');
        }
    }

    static async deleteTodo(id) {
        try {
            const deleted = await todo.delete(id);
            if (!deleted) throw new Error('Tarefa não encontrada');
            return { message: 'Tarefa deletada com sucesso!' };
        } catch (err) {
            console.error('❌ Erro ao deletar todo', err);
            throw new Error('Erro ao deletar a tarefa');
        }
    }
}

export default TodoService;