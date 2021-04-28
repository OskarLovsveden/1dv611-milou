import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import createHttpError from 'http-errors';
import { IPayload } from '../interfaces/IPayload';

export default class AuthMiddleware {
    public requestIncludesEmail(req: Request, next: NextFunction): void {
        if (!req.body.email) {
            next(createHttpError(400, { 
                message: {
                    detail: 'Email needs to be provided'
                }
            }));
            return;
        }

        next();
    }

    public requestIncludesPassword(req: Request, next: NextFunction): void {
        if (!req.body.password) {
            next(createHttpError(400, { 
                message: {
                    detail: 'password needs to be provided'
                }
            }));
            return;
        }

        next();
    }

    public async isAuthenticated(req: Request, next: NextFunction): Promise<void> {
        if (!req.headers.authorization) {
            next(createHttpError(401));
            return;
        }

        const authorization = req.headers.authorization.split(' ');

        if (authorization[0] !== 'Bearer') {
            next(createHttpError(401, { 
                message: {
                    detail: 'Access token missing'
                }
            }));
            return;
        }

        try {
            const publicKey = await fs.promises.readFile('./public.pem');
            req.user = jwt.verify(authorization[1], publicKey) as IPayload;
            next();
        } catch (error) {
            next(createHttpError(403, { 
                message: {
                    detail: 'Invalid access token'
                }
            }));
        }
    }

    public isAuthorized(req: Request, next: NextFunction) {
        throw new Error('Not implemented');
    }
}