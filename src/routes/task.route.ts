import { Router } from 'express'
import taskService from '../services/task.service'

const { createTask, deleteTask, getAllTasks, getTaskById, updateTask } =
  taskService

const router = Router()

router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
