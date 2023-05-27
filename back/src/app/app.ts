import express, { Router, Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import cors from 'cors';

export class App {

    private app: Express;
    private server: Server | null = null;

    constructor(routers: Router[]) {
        this.app = express();
        this.initzializeMiddlewares();
        this.app.use(routers);
        this.exceptionHandler();
    }

    start(): void {
        this.server = this.app.listen(process.env.API_PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Example app listening at http://localhost:${process.env.API_PORT}`);
        });
    }

    stop(): void {
        this.server?.close();
    }

    private initzializeMiddlewares(): void {
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(cors());
    }

    private exceptionHandler(): void {
        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            if (error) {
                res.status(500).json({
                    error: 'Unknown error',
                });
            }

            next();
        });
    }

}
