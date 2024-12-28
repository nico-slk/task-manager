import cors from 'cors';
import express, { Application } from 'express';
import { createServer, Server as ServerNode } from 'http';
import morgan from 'morgan';
import db from '../connection/db';
import { ApiPaths } from './src/routes';

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
            await db.authenticate();
            await db.sync({ alter: true });
            // await db.sync({ force: true });
            // await db.sync();
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
            const routeModule = await import(`./src/router/${router}.ts`);

            this.app.use(`/api${url}`, routeModule.default || routeModule);
        });
    }

    listen() {
        this.ServerNode.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

export default Server;
