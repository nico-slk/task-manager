import { Router } from 'express';
import { body, param } from 'express-validator';
import taskService from '../services/task.service';
import { ValidJWT, ValidateRequest } from '../utils';

const { validJwt } = ValidJWT;
const { validateRequest } = ValidateRequest;

const { createTask, deleteTask, getAllTasks, getTaskById, updateTask } =
  taskService;

const router = Router();

// Validaciones
const idValidation = param('id')
  .isMongoId()
  .withMessage('El ID debe ser un MongoID válido');
const taskValidation = [
  body('title')
    .isString()
    .withMessage('El título es obligatorio y debe ser un texto'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage(
      'El estado debe ser uno de los siguientes: pending, in-progress, completed',
    ),
];

// Rutas
router.get('/', [validJwt], getAllTasks);
router.get('/:id', idValidation, validJwt, validateRequest, getTaskById);
router.post('/', taskValidation, validJwt, validateRequest, createTask);
router.put(
  '/:id',
  [idValidation, ...taskValidation],
  validJwt,
  validateRequest,
  updateTask,
);
router.delete('/:id', idValidation, validJwt, validateRequest, deleteTask);

export default router;
