import express from 'express'
import IndexRouter from './routes/indexRouter'

export default class Server {
    private app: express.Application = express()
    private indexRouter: IndexRouter = new IndexRouter()
    constructor(private port: number | string) {
        // Empty
    }

    public run (): void {
        // Call everything that needs to be run before starting the server//
        //===============================================================//

        // Setting up routes
        this.app.use('/', this.indexRouter.router)
        this.listen()
    }
    
    private listen(): void {
        this.app.listen(this.port, () => console.log(`App listening on http://localhost:${this.port}`))
    }
}