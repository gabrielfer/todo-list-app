import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import path from 'path';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(express.static('public'));

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});