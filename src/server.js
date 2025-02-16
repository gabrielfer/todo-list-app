import express from 'express';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static('public'));
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/ping', (req, res) => {
    res.send('Pong! Server is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});