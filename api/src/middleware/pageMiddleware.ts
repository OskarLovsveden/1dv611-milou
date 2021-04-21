import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export default class PageMiddleware {
    public bodyHasAddress(req: Request, next: NextFunction): void {
        const { address } = req.body;
        if(!address) {
            next(createHttpError(400, { 
                message: {
                    'detail': 'Required parameter is missing.', 
                    'parameter': 'address'
                }})
            );
        }
        next();
    }

    public paramsHasObjectId(req: Request, next: NextFunction): void {
        const { id } = req.params;

        if(!isValidObjectId(id)) {
            next(createHttpError(400, { 
                message: {
                    'detail': 'Required parameter is not a valid page ID.', 
                    'parameter': 'id'
                }
            }));
        }

        next();
    }
}