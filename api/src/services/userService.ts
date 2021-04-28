import { Request } from 'express';
import User from '../models/user';
import createHttpError from 'http-errors';

export interface UserData {
    email: string
    password: string
}

export default class UserService {
    public async createUser(req: Request): Promise<void> {
        try {
            const { email, password } = req.body;
                
            const userData: UserData = {email: email, password: password};
            await new User(userData).save();    
             
        } catch (error) {
            if (error.code === 11000) {
                throw createHttpError(409, { 
                    message: {
                        detail: 'This email is already registered.', 
                        email: req.body.email
                    }});
            } 
            else if (error.name === 'ValidationError') {
                if(error.errors.email) {
                    throw createHttpError(400, { 
                        message: {
                            detail: error.message, 
                            email: req.body.email
                        }});
                }
                else if(error.errors.password) {
                    throw createHttpError(400, { 
                        message: {
                            detail: error.message
                        }});
                }     
            }
        }
    }
}