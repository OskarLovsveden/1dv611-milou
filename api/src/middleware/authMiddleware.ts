import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import createHttpError from 'http-errors';
import IPayload from '../interfaces/IPayload';

export default class AuthMiddleware {
    // Find soulution to add variables to request object
    public async isAuthenticated(req: any, next: NextFunction): Promise<void> {
        if (!req.headers.authorization) {
            next(createHttpError(401));
            return;
        }

        const authorization = req.headers.authorization.split(' ');

        if (authorization[0] !== 'Bearer') {
            next(createHttpError(401));
            return;
        }

        try {
            const publicKey = await fs.promises.readFile('./public.pem'); 
            const payload = jwt.verify(authorization[1], publicKey);

            req.user = payload;
        } catch (error) {
            next(createHttpError(403));
        }
    }

    public isAuthorized(req: Request, next: NextFunction) {
        throw new Error('Not implemented');
    }

    public async createToken(payload: IPayload, next: NextFunction): Promise<string> {
        const privateKey = await fs.promises.readFile('./private.pem', 'utf8');

        const signOptions: jwt.SignOptions = { algorithm: 'RS256', expiresIn: '1h' };

        return jwt.sign(payload, privateKey, signOptions);
    }
}