import { Request } from 'express';
import { IPayload } from '../interfaces/IPayload';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';

export default class AuthService {

    public async authenticateUser(req: Request): Promise<string> {
        const { email, password } = req.body;
        await User.authenticate(email, password);
        
        return await this.createToken({email});
    }

    private async createToken(payload: IPayload): Promise<string> {
        const privateKey = await fs.promises.readFile('./private.pem', 'utf8');

        const signOptions: jwt.SignOptions = { algorithm: 'RS256', expiresIn: '1h' };

        return jwt.sign(payload, privateKey, signOptions);
    }
}