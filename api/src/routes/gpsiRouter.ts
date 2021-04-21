import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import GPSIController from '../controllers/gpsiController';
import AuthMiddleware from '../middleware/authMiddleware';
import GPSIMiddleware from '../middleware/gpsiMiddleware';


export default class GPSIRouter implements IRouter {
    expressRouter: express.Router = express.Router()
    private controller: GPSIController = new GPSIController()
    private middleware: GPSIMiddleware = new GPSIMiddleware()
    private authMiddleware: AuthMiddleware = new AuthMiddleware()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.expressRouter.get('/measure', 
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.requestHasAddresses(req, next),
            (req, res, next) => this.controller.getMeasurement(req, res, next),
        );
    }
}