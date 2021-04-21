import express from 'express';
import PageRouter from './pageRouter';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import GPSIRouter from './gpsiRouter';

export default class IndexRouter {
    public router: express.Router = express.Router()
    private pageRouter: PageRouter = new PageRouter()
    private userRouter: UserRouter = new UserRouter()
    private authRouter: AuthRouter = new AuthRouter()
    private gpsiRouter: GPSIRouter = new GPSIRouter()
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use('/pages', this.pageRouter.expressRouter);
        this.router.use('/users', this.userRouter.expressRouter);
        this.router.use('/auth', this.authRouter.expressRouter);
        this.router.use('/gpsi', this.gpsiRouter.expressRouter);
    }
}
