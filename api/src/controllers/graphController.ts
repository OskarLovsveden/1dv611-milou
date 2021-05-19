import { NextFunction, Request, Response } from 'express';
import GraphService from '../services/graphService';

export default class GraphController {
    private service: GraphService = new GraphService()

    public async getGraph(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const graph = await this.service.createGraph(req);
            res.send(graph);
        } catch (error) {
            next(error);
        }
    }
}