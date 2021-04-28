import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';

export default class GPSIMiddleware {
    public requestHasAddresses(req: Request, next: NextFunction): void {
        const { addresses } = req.body;

        if (!addresses || !Array.isArray(addresses) || addresses.length < 1) {
            next(createHttpError(400, { 
                message: {
                    detail: 'Invalid parameters, Adresses should be sent as an array'
                }
            }));
            return;
        }

        next();
    }
}