import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import PageController from '../controllers/pageController';
import PageMiddleware from '../middleware/pageMiddleware';
import AuthMiddleware from '../middleware/authMiddleware';

export default class PageRouter implements IRouter {
    private controller: PageController = new PageController()
    private middleware: PageMiddleware = new PageMiddleware()
    private authMiddleware: AuthMiddleware = new AuthMiddleware()
    expressRouter: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.expressRouter.post('/',
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.validateRequestData(req, next),
            (req, res, next) => this.controller.create(req, res, next)
        );
        this.expressRouter.get('/', 
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.controller.getAll(req, res, next)
        );
    }


}