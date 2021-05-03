import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export default class PageMiddleware {
    public bodyHasAddress(req: Request, next: NextFunction): void {
        const { address } = req.body;
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

    public bodyHasTestInterval(req: Request, next: NextFunction): void {
        const { testInterval } = req.body;
        if (!testInterval) {
            next(createHttpError(400, {
                message: {
                    detail: 'Required parameter is missing.',
                    parameter: 'testInterval'
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
                    detail: 'Required parameter is not a valid page ID.', 
                    id: id
                }
            }));
        }

        next();
    }
}