import { Response, Request, NextFunction } from 'express';
import createHttpError from 'http-errors';

export default class ExampleMiddleware {
    exampleMethod(req: Request, res: Response, next: NextFunction): void {
        console.log('HEJ');
        next();
    }

    fullnameCheck(req: Request, res: Response, next: NextFunction): void {
        const { firstname, lastname } = req.body;

        if (firstname && lastname) {
            return next();
        }

        next(createHttpError(400, 'Missing parameters.'));
    }
}