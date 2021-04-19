import { Request } from 'express';
import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import { URL } from 'url';
import User from 'models/user';

export interface pageData {
    href: string
    hostname: string
    pathname: string
}

export default class PageService {

    public async createPage(req: Request): Promise<IPage> {
        try {          
            return await Page.insert(new URL(req.body.address));
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }

    public async updatePage(req: any): Promise<void> {
        try {
            // Find user
            const user = await User.findOne({email: req.user.email});
        
            // User not found...
            if (!user) {
                // ... 404
                throw createHttpError(404, 'User not found');
            }

            // Add "new" address if not exists
            const page = await Page.findOrCreate(new URL(req.body.address), req.params.id);
            
            // find old address in array using :id 
            // replace with "new" address id
            const index = user.pageIds.findIndex(req.params.id);
            pageIds[index] = page.id;
            user.save();
            
        } catch (error) {
            console.log('error in service: ', error);

            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }
}