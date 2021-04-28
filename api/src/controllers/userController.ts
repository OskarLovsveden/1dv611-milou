import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
    private service: UserService = new UserService();
    
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.service.createUser(req);
            res.status(201).json({message: 'User created'});
            
        } catch (error) {
            next(error);
        }
    }
}