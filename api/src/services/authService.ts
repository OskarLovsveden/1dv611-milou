import { Request } from 'express';
import { IPayload } from '../interfaces/IPayload';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import createHttpError from 'http-errors';

export default class AuthService {

    public async authenticateUser(req: Request): Promise<string> {
        try {
            const { email, password } = req.body;
            await User.authenticate(email, password);
            
            return await this.createToken({email});

        } catch (error) {
            throw createHttpError(401, { 
                message: {
                    detail: error.message
                }
            });
        }
    }

    private async createToken(payload: IPayload): Promise<string> {
        const privateKey = await fs.promises.readFile('./private.pem', 'utf8');
        const signOptions: jwt.SignOptions = { algorithm: 'RS256', expiresIn: '1h' };
        return jwt.sign(payload, privateKey, signOptions);
    }
}