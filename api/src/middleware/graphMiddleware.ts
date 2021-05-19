import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';

export default class GraphMiddleware {
    public queryHasAddress(req: Request, next: NextFunction): void {
        const { address } = req.query;
        if(!address) {
            next(createHttpError(400, { 
                message: {
                    detail: 'Required parameter is missing.',
                    parameter: 'address'
                }})
            );
        }
        next();
    }
}