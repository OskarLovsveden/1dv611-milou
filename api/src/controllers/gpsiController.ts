import { NextFunction, Request, Response } from 'express';
import GPSIService from '../services/gpsiService';

export default class GPSIController {
    private service: GPSIService = new GPSIService()
    public async getMeasurement(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.measurePages(req);

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}