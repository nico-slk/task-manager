import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { DB_NAME, DB_HOST, DB_PORT, MONGO_HOST, MONGO_PORT, MONGO_NAME } =
  process.env

// const dbURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const dbURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`

export const connectDB = async () => {
  console.log(dbURL)

  try {
    await mongoose.connect(dbURL)
    console.log('Conexión a la base de datos MongoDB establecida.')
  } catch (error) {
    console.error('Error al conectar a la base de datos MongoDB:', error)
    throw error
  }
}

export default mongoose
