import express from 'express';
import ExampleRouter from './exampleRouter';
import PageRouter from './pageRouter';

export default class IndexRouter {
    public router: express.Router = express.Router()
    private exampleRouter: ExampleRouter = new ExampleRouter()
    private pageRouter: PageRouter = new PageRouter()
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use('/page', this.pageRouter.expressRouter);
        this.router.use('/example', this.exampleRouter.expressRouter);
    }
}


