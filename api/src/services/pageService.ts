import { Request } from 'express';
import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import { URL } from 'url';
import User from '../models/user';

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

    public async getDomainPages(req: any): Promise<IPage[]> {
        try {
            const user = await User.findOne(req.user.email);

            if(user) {  
                return await Page.getAllPages(user.domainIds);
            }
            throw createHttpError(404);
        } catch (error) {
            throw createHttpError(400);
        }
    }

    public async updatePage(req: Request): Promise<IPage> {
        try {          
            return await Page.findAndUpdate(new URL(req.body.address), req.params.id);
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }
}