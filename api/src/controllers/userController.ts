import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';
import createHttpError from 'http-errors';

export default class UserController {
    private service: UserService = new UserService();
    
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.service.createUser(req);
            res.status(201).json({message: 'User created'});
            
        } catch (error) {
            if (error.code === 11000) {
            // Duplicated keys.
                error = createHttpError(409, 'This email is already registered');
            } else if (error.name === 'ValidationError') {
            // Validation error(s).
                console.log('============');
                console.log(error.message);
                console.log('============');
                error = createHttpError(400, error.message);
            }
            next(error);
        }
    }
}