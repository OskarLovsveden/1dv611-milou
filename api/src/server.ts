import express, { Request, Response, NextFunction } from 'express';
import IndexRouter from './routes/indexRouter';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { HttpError } from 'http-errors';
import { startCronJob } from './utils/cronJob';

export default class Server {
    private app: express.Application = express()
    private indexRouter: IndexRouter = new IndexRouter()
    constructor(private port: number | string) {
        // Empty
    }

    public run(): void {
        // Call everything that needs to be run before starting the server//
        //===============================================================//
        this.app.use(express.json());
        startCronJob();
        // Setting up routes
        this.app.use('/', this.indexRouter.router);
        this.swaggerBoot();
        this.errorHandler();
        this.listen();
    }

    private async swaggerBoot(): Promise<void> {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'Project Hermes',
                    version: '1.0.0',
                    description: 'API Documentation'
                }
            },
            servers: [
                { 
                    url: process.env.BASE_URL
                }
            ],
            apis: 
            [
                /* './src/routes/pageRouter.js',
                './src/routes/userRouter.js',
                './src/routes/gpsiRouter.js',
                './src/routes/authRouter.js',
                './src/routes/graphRouter.js' */
                './src/routes/*.ts', './src/routes/*.js'
            ]
        };

        const swaggerDocs = swaggerJSDoc(options);
        this.app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    }

    private errorHandler(): void {
        this.app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
            res
                .status(err.status)
                .json({
                    name: err.name,
                    status: err.status,
                    message: err.message
                });
            return;
        });
    }

    private listen(): void {
        this.app.listen(this.port, () => console.log(`App listening on http://localhost:${this.port}`));
    }
}