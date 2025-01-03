import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_PASSWORD, MONGO_USER, MONGO_HOST, MONGO_PORT } = process.env;

const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

// const dbURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log('Conexión a la base de datos MongoDB establecida.');
  } catch (error) {
    console.error('Error al conectar a la base de datos MongoDB:', error);
    throw error;
  }
};

export default mongoose;
