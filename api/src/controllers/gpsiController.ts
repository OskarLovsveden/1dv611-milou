import { NextFunction, Request, Response } from 'express';
import GPSIService from '../services/gpsiService';

export default class GPSIController {
    private service: GPSIService = new GPSIService()

    public async getMeasurements(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gpsiResults = [];

            for (const address of req.body.addresses) {
                const data = await this.service.measurePage(address);
                gpsiResults.push(data);
            }

            res.status(200).json(gpsiResults);
        } catch (error) {
            next(error);
        }
    }
}