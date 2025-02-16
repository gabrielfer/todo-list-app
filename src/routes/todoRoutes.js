import express from 'express';
import TodoController from '../controllers/TodoController.js';

const router = express.Router();

router.get('/', TodoController.getAllTodos);
router.post('/', TodoController.createTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export default router;