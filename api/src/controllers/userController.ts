import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';
import createHttpError from 'http-errors';

export default class UserController {
    private service: UserService = new UserService();
    
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.service.createUser(req);
            res.status(200).json({message: 'User created'});
            
        } catch (error) {
            let err = error;
        
            if (err.code === 11000) {
            // Duplicated keys.
                err = createHttpError(409);
                err.innerException = error;
            } else if (error.name === 'ValidationError') {
            // Validation error(s).
                err = createHttpError(400);
                err.innerException = error;
            }
        
            next(err);
        }
    }
}