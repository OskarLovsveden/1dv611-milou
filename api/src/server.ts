import express, { Request, Response, NextFunction } from 'express'
import IndexRouter from './routes/indexRouter'

export default class Server {
    private app: express.Application = express()
    private indexRouter: IndexRouter = new IndexRouter()
    constructor(private port: number | string) {
        // Empty
    }

    public run(): void {
        // Call everything that needs to be run before starting the server//
        //===============================================================//
        this.app.use(express.json())
        // Setting up routes
        this.app.use('/', this.indexRouter.router)
        this.errorHandler()
        this.listen()
    }

    private errorHandler(): void {
        this.app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
            console.log(err)
            res
                .status(err.status)
                .json({
                    name: err.name,
                    status: err.status,
                    message: err.message
                })
            return
        })
    }

    private listen(): void {
        this.app.listen(this.port, () => console.log(`App listening on http://localhost:${this.port}`))
    }
}