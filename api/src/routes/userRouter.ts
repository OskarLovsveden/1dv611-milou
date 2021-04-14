import { Router } from 'express';
import UserController from '../controllers/userController';
import { IRouter } from '../interfaces/IRouter';
import UserMiddleware from '../middleware/userMiddleware';

export default class UserRouter implements IRouter {
    expressRouter: Router = Router()
    controller: UserController = new UserController()
    middleware: UserMiddleware = new UserMiddleware()
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.expressRouter.post('/',
            (req, res, next) => this.middleware.validateRequestData(req, next), 
            (req, res, next) => this.controller.register(req, res, next)
        );
    }

}