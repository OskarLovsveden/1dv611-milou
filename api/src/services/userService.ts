import { Request } from 'express';
import User from '../models/user';

export interface UserData {
    email: string
    password: string
}

export default class UserService {
    public async createUser(req: Request): Promise<void> {
        const { email, password } = req.body;
            
        const userData: UserData = {email: email, password: password};
        await new User(userData).save();
    }
}