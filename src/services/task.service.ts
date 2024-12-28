import { Request, Response } from 'express'
import { TaskModel } from '../models'

const getTasksByUserId = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const tasks = await TaskModel.findAll({ where: { userId: id } })

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found for the specified user.',
        tasks,
      })
    }

    return res.status(200).json({
      success: true,
      data: tasks,
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

const getTaskById = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const task = await TaskModel.findByPk(id)

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      })
    }

    return res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error('Error fetching task:', error)

    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the task.',
      error: error.message,
    })
  }
}

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.findAll()

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found.',
        tasks,
      })
    }

    return res.status(200).json({
      success: true,
      data: tasks,
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

const createTask = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body

  try {
    const task = await TaskModel.create({ title, description, userId })

    if (!title) {
      return res.status(404).json({
        success: false,
        message: 'Title should not be empty.',
      })
    }

    return res.status(201).json({
      success: true,
      data: task,
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

const updateTask = async (req: Request, res: Response) => {
  const id = req.params.id
  const { title, description, status } = req.body

  try {
    const task = await TaskModel.findByPk(id)

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      })
    }

    await task.update({ title, description, status })

    return res.status(200).json({
      success: true,
      data: task,
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

const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const task = await TaskModel.findByPk(id)

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      })
    }

    await task.destroy()

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
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

export default {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
}
