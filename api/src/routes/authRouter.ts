import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import AuthController from '../controllers/authController';

export default class AuthRouter implements IRouter {
    private controller: AuthController = new AuthController()
    private middleware: AuthMiddleware = new AuthMiddleware()
    expressRouter: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.expressRouter.post('/login', 
            (req, res, next) => this.middleware.requestIncludesEmail(req, next),
            (req, res, next) => this.middleware.requestIncludesPassword(req, next),
            (req, res, next) => this.controller.login(req, res, next)
        );
    }
}