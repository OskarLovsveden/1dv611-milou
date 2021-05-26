import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import GraphMiddleware from '../middleware/graphMiddleware';
import GraphController from '../controllers/graphController';

export default class GraphRouter implements IRouter {
    private controller: GraphController = new GraphController()
    private middleware: GraphMiddleware = new GraphMiddleware()
    
    public router: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        /**
         * @swagger
         * /graphs:
         *   get:
         *     summary: GPSI results graph.
         *     tags:
         *       - Graph 
         *     description: Get graph of the lastest GPSI measurements(max 20) on a specific address.
         *     operationId: getGraph
         *     parameters:
         *       - name: address
         *         in: query
         *         description: Address of the measured page
         *         required: true
         *     responses:
         *       200:
         *         description: Returns an JSON object of GPSI readings.
         *       404:
         *         description: Bad request, probably missing address.
         */
        this.router.get('/', 
            (req, res, next) => this.middleware.queryHasAddress(req, next),
            (req, res, next) => this.controller.getGraph(req, res, next),
        );
    }
}