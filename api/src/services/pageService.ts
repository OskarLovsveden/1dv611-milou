import { Request } from 'express';
import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import User from '../models/user';
import { URL } from 'url';
import { validateUrlResponse } from '../utils/urlUtilities';

export interface pageData {
    href: string
    hostname: string
    pathname: string
}

export default class PageService {

    public async createPage(req: Request): Promise<IPage> {
        try {
            const url = new URL(req.body.address);

            const foundPage = await Page.findOne({address: url.href});

            if(foundPage){
                const user = await User.findOne({email: req?.user?.email});
                if (user){
                    if(!user.pageIds.includes(foundPage.id)){
                        user.pageIds.push(foundPage.id);
                        await User.updateOne({_id: user.id}, {pageIds: user.pageIds});
                    }
                }
                return foundPage;
            }

            const newPage = await Page.insert(url);
            
            const user = await User.findOne({email: req?.user?.email});
            if (user){
                user.pageIds.push(newPage.id);
                await User.updateOne({_id: user.id}, {pageIds: user.pageIds});
            }
            return newPage;
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, { 
                    message: {
                        detail: `${error.input} is not a valid address.`, 
                        address: error.input
                    }
                });
            }
            throw error;
        }
    }
 
    public async getPages(req: Request): Promise<IPage[]> {
        try {
            const user = await User.findOne({email: req?.user?.email});
            
            if(user) { 
                if(req.query.address) {
                    const url = new URL(req.query.address as string);
                    const domainPages = await Page.getAllDomainPages(url.href, user.pageIds);
                    return this.sortAlphabetically(domainPages, 'path');
                }
                const allPages = await Page.getAllPages(user.pageIds);
                return this.sortAlphabetically(allPages, 'domain');
            }
            throw createHttpError(400);
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, { 
                    message: {
                        detail: `${error.input} is not a valid address.`, 
                        address: error.input
                    }
                });
            }
            throw error;
        }
    }

    public async updatePage(req: Request): Promise<void> {
        try {
            const user = await User.findOne({email: req?.user?.email});
        
            if (!user) {
                throw createHttpError(404, 'User not found');
            }

            if (!user.pageIds.includes(req.params.id)) {
                throw createHttpError(403, 'Forbidden');
            }

            await validateUrlResponse(req.body.address);
            const page = await Page.findOrCreate(new URL(req.body.address));
            await User.updatePageId(user, req.params.id, page.id);

        } catch (error) {
            console.log(error);
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, { 
                    message: {
                        detail: `${error.input} is not a valid address.`, 
                        address: error.input
                    }
                });
            }
            throw error;
        }
    }

    public async deletePage(req: Request): Promise<void> {
        try {
            const user = await User.findOne({email: req?.user?.email});

            if (!user) {
                throw createHttpError(404, 'User not found');
            }

            if (!user.pageIds.includes(req.params.id)) {
                throw createHttpError(403, 'Forbidden');
            }

            await User.deletePageId(user, req.params.id);

        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw error;
        }
    }
    
    private sortAlphabetically(address: IPage[], sortType: string) {
        return address.sort((a, b) => {
            if (a[sortType as keyof IPage] < b[sortType as keyof IPage]) return -1;
            else if (a[sortType as keyof IPage] > b[sortType as keyof IPage]) return 1;
            return 0;
        });
    }
}