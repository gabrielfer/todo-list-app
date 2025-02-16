import pool from '../../config/db.js';

class Todo {
    constructor(task) {
        this.id = crypto.randomUUID();
        this.task = task;
        this.completed = false;
        this.date = new Date().toISOString();
    }

    static async create(task) {
        const id = crypto.randomUUID();
        const query = `
            INSERT INTO todos (task) 
            VALUES ($1, $2) 
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [task]);
            return new Todo(
                result.rows[0].id,
                result.rows[0].task,
                result.rows[0].completed,
                result.rows[0].created_at
            );

        } catch { err; } {
            console.error('❌ Error during todo creation:', err);
            throw err;
        }
    }

    static async getAll() {
        const query = 'SELECT * FROM todos ORDER BY created_at DESC;';

        try {
            const result = await pool.query(query);
            return result.rows.map(row => new Todo(row.id, row.task, row.completed, row.created_at));
        } catch (err) {
            console.error('❌ Error during todos search:', err);
            throw err;
        }
    }

    static async update(id, task, completed) {
        const query = `
            UPDATE todos 
            SET task = COALESCE($1, task), 
                completed = COALESCE($2, completed)
            WHERE id = $3 
            RETURNING *;
        `;

        try {
            const result = await pool.query(query, [task, completed, id]);
            if (result.rowCount === 0) return null;
            return new Todo(
                result.rows[0].id,
                result.rows[0].task,
                result.rows[0].completed,
                result.rows[0].created_at
            );
        } catch (err) {
            console.error('❌ Error during todo update:', err);
            throw err;

        }
    }

    static async delete(id) {
        const query = 'DELETE FROM todos WHERE id = $1 RETURNING *;';

        try {
            const result = pool.query(query);
            return (await result).rowCount > 0;

        } catch (err) {
            console.error('❌ Erro ao deletar todo:', error);
            throw err;
        }
    }
}

export default Todo;