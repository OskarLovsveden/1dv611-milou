import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';

export default class UserMiddleware {
    public validateRequestData(req: Request, next: NextFunction): void {
        const { email, password } = req.body;
        
        if(!email) {
            next(createHttpError(400, 'Please provide an email'));
        }
        
        if(!password) {
            next(createHttpError(400, 'Please provide a password'));
        }
        next();
    }
}