import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { createServer, Server as ServerNode } from 'http';
import morgan from 'morgan';
import path from 'path';
import { connectDB } from '../connection/db';
import { ApiPaths } from '../routes';

dotenv.config();

export class Server {
  private app: Application;
  private port: string | number;
  ServerNode: ServerNode;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.dbConnection();
    this.middleware();
    this.routes();
    this.ServerNode = createServer(this.app);
  }

  async dbConnection() {
    try {
      await connectDB();
      console.log('Database online');
    } catch (error) {
      throw new Error(error as string);
    }
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: '5mb' }));
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }));
    this.app.use(morgan('dev'));
  }

  routes() {
    ApiPaths.forEach(async ({ url, router }) => {
      const filePath = path.resolve(__dirname, '../routes', `${router}.js`);

      try {
        await fsPromises.access(filePath, fs.constants.F_OK);

        const routeModule = await import(filePath.toString());
        this.app.use(`/api${url}`, routeModule.default || routeModule);
      } catch (error) {
        console.error(
          `El archivo ${filePath} no existe o no es accesible:`,
          error.message,
        );
      }
    });
  }

  listen() {
    this.ServerNode.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }
}

export default Server;
