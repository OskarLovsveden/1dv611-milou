import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/authService';

export default class AuthController {
    private service: AuthService = new AuthService()
    
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const jwtString = await this.service.authenticateUser(req);
            res.status(200).json({token: jwtString});
        } catch (error) {
            next(error);
        }
    } 
}