import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(express.static('public'));

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});