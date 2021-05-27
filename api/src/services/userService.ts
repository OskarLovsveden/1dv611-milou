import { Request } from 'express';
import User from '../models/user';
import createHttpError from 'http-errors';

const userExistMessage = 'User exists';

export interface UserData {
    email: string
    password: string
}

export default class UserService {
    public async createUser(req: Request): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email: email});

            if (user) {
                throw new Error(userExistMessage);
            } else {
                await User.create({email: email, password: password});    
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
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

            if (error.message === userExistMessage) {
                throw createHttpError(409, { 
                    message: {
                        detail: 'This email is already registered.', 
                        email: req.body.email
                    }});
            }
        }
    }
}