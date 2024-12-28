import dotenv from 'dotenv'
import * as mysql2 from 'mysql2'
import { Sequelize } from 'sequelize'

dotenv.config()

const { MYSQL_DATABASE, MYSQL_PUBLIC_URL, MYSQLHOST, MYSQLPORT } = process.env
// const dbURL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const db = new Sequelize(MYSQL_PUBLIC_URL, {
  host: MYSQLHOST,
  dialect: 'mysql',
  dialectModule: mysql2,
  logging: false,
  port: +MYSQLPORT,
  timezone: '-03:00',
  database: MYSQL_DATABASE,
})

db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida.')
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error)
  })

export default db
