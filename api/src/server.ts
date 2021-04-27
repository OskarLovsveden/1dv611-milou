import express, { Request, Response, NextFunction } from 'express';
import IndexRouter from './routes/indexRouter';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
// import * as swaggerDoc from './swagger.json';

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
        // Setting up routes
        this.app.use('/', this.indexRouter.router);
        this.swaggerExecution();
        this.errorHandler();
        this.listen();
    }

    private async swaggerExecution(): Promise<void> {
        const options = {
            swaggerDefinition: {
                // openapi: '3.0.0',
                info: {
                    title: 'Project Hermes',
                    version: '1.0.0',
                    description: 'API Documentation'
                }
            },
            servers: [
                { 
                    url: 'http://localhost:5000/'
                }
            ],
            apis: 
            [
                './src/routes/pageRouter.ts',
                './src/routes/userRouter.ts',
                './src/routes/gpsiRouter.ts',
                './src/routes/authRouter.ts'
            ]
        };

        const swaggerDocs = await swaggerJSDoc(options);
        this.app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        
    }

    private errorHandler(): void {
        this.app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
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