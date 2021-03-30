import express from 'express'
import ExampleRouter from './exampleRouter'

export default class IndexRouter {
    public router: express.Router = express.Router()
    private exampleRouter: ExampleRouter = new ExampleRouter()
    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.use('/example', this.exampleRouter.expressRouter)
    }
}


