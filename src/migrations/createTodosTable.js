import pool from '../../config/db.js';

const createTodosTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS todos (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            task TEXT NOT NULL,
            completed BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
        console.log('✅ Table "todos" created successfully.');

    } catch (err) {
        console.error('❌ Error creating table:', err);

    } finally {
        pool.end();
    }
};

createTodosTable();