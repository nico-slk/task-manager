import * as mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = process.env;
const dbURL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db = new Sequelize(dbURL, {
    host: DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false,
    port: +DB_PORT,
    timezone: '-03:00',
});

db.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

export default db;