import { Request, Response } from 'express'
import TaskSchema from '../models/task.model'

class TaskService {
  constructor() {}

  getTaskById = async (req: Request, res: Response): Promise<Document> => {
    const id = req.params.id

    try {
      const tasks = await TaskSchema.find(id)

      if (tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No tasks found.',
          tasks,
        })
      }

      return res.status(200).json({
        success: true,
        tasks,
      })
    } catch (error) {
      console.error('Error fetching tasks:', error)

      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching tasks.',
        error: error.message,
      })
    }
  }

  getAllTasks = async (req: Request, res: Response) => {
    // DEBO PODER FILTRAR POR STATUS PERO ES UN GET, NO TENGO NINGUNA FLAG PARA ESO
    try {
      const tasks = await TaskSchema.find()

      if (tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No tasks found.',
          tasks,
        })
      }

      return res.status(200).json({
        success: true,
        tasks,
      })
    } catch (error) {
      console.error('Error fetching tasks:', error)

      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching tasks.',
        error: error.message,
      })
    }
  }

  createTask = async (req: Request, res: Response) => {
    const { title, description, userId } = req.body

    try {
      const task = await TaskSchema.create({ title, description, userId })

      if (!title) {
        return res.status(404).json({
          success: false,
          message: 'Title should not be empty.',
          task,
        })
      }

      return res.status(201).json({
        success: true,
        task,
      })
    } catch (error) {
      console.error('Error creating task:', error)

      return res.status(500).json({
        success: false,
        message: 'An error occurred while creating the task.',
        error: error.message,
      })
    }
  }

  updateTask = async (req: Request, res: Response) => {
    const id = req.params.id
    const { title, description, status } = req.body

    try {
      const task = await TaskSchema.findOneAndUpdate(id, {
        title,
        description,
        status,
      })

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.',
          task,
        })
      }

      return res.status(200).json({
        success: true,
        task,
      })
    } catch (error) {
      console.error('Error updating task:', error)

      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating the task.',
        error: error.message,
      })
    }
  }

  deleteTask = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
      const task = await TaskSchema.findOneAndDelete(id)

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.',
          task,
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully.',
        task,
      })
    } catch (error) {
      console.error('Error deleting task:', error)

      return res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the task.',
        error: error.message,
      })
    }
  }
}

export default new TaskService()
