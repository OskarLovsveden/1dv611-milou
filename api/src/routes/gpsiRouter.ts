import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import GPSIController from '../controllers/gpsiController';
import AuthMiddleware from '../middleware/authMiddleware';
import GPSIMiddleware from '../middleware/gpsiMiddleware';

export default class GPSIRouter implements IRouter {
    private controller: GPSIController = new GPSIController()
    private middleware: GPSIMiddleware = new GPSIMiddleware()
    private authMiddleware: AuthMiddleware = new AuthMiddleware()
    
    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        /**
         * @swagger
         * /api/measure:
         *   post:
         *     summary: Google PageSpeed Insights readings.
         *     tags:
         *       - gpsi
         *     description: Get readings with GPSI by inputting one or more addresses.
         *     parameters:
         *       - name: addresses
         *         in: body
         *         description: An array of one or more addresses to be measured.
         *         required: true
         *       - name: bearer-token
         *         in: header
         *         description: Bearer token that the user supplies
         *         required: true
         *     responses:
         *       200:
         *         description: Returns a JSON object of GPSI readings.
         *       401:
         *         description: Unauthorized.
         */
        this.router.post('/measure', 
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            (req, res, next) => this.middleware.requestHasAddresses(req, next),
            (req, res, next) => this.controller.getMeasurements(req, res, next),
        );
    }
}