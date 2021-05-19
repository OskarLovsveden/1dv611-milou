import express from 'express';
import PageRouter from './pageRouter';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import GPSIRouter from './gpsiRouter';
import GraphRouter from './graphRouter';
import { IRouter } from 'interfaces/IRouter';

export default class IndexRouter implements IRouter {
    private pageRouter: PageRouter = new PageRouter()
    private userRouter: UserRouter = new UserRouter()
    private authRouter: AuthRouter = new AuthRouter()
    private gpsiRouter: GPSIRouter = new GPSIRouter()
    private graphRouter: GraphRouter = new GraphRouter()
    
    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use('/pages', this.pageRouter.router);
        this.router.use('/users', this.userRouter.router);
        this.router.use('/auth', this.authRouter.router);
        this.router.use('/gpsi', this.gpsiRouter.router);
        this.router.use('/graphs', this.graphRouter.router);
    }
}
