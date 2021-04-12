import express from 'express';
import ExampleRouter from './exampleRouter';
import PageRouter from './pageRouter';
import UserRouter from './userRouter';

export default class IndexRouter {
    public router: express.Router = express.Router()
    private exampleRouter: ExampleRouter = new ExampleRouter()
    private pageRouter: PageRouter = new PageRouter()
    private userRouter: UserRouter = new UserRouter()

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use('/page', this.pageRouter.expressRouter);
        this.router.use('/users', this.userRouter.expressRouter);
        this.router.use('/example', this.exampleRouter.expressRouter);
    }
}
