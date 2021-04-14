import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';

export default class PageMiddleware {
    public validateRequestData(req: Request, next: NextFunction): void {
        const { address } = req.body;
        console.log(address);
        if(!address) {
            next(createHttpError(400, 'Missing parameters'));
        }
        next();
    }
}