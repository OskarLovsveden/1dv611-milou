import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import User from '../models/user';
import { URL } from 'url';

export interface pageData {
    href: string
    hostname: string
    pathname: string
}

export default class PageService {

    // Change from any to request. -------------------------------------------
    public async createPage(req: any): Promise<IPage> {
        try {
            const url = new URL(req.body.address);

            const foundPage = await Page.findOne({address: url.href});
            
            if(foundPage){
                const user = await User.findOne({email: req.user.email});
                if (user){
                    if(!user.pageIds.includes(foundPage.id)){
                        user.pageIds.push(foundPage.id);
                        await User.updateOne({_id: user.id}, {pageIds: user.pageIds});
                    }
                }
                return foundPage;
            }

            const newPage = await Page.insert(url);
            
            const user = await User.findOne({email: req.user.email});
            if (user){
                user.pageIds.push(newPage.id);
                await User.updateOne({_id: user.id}, {pageIds: user.pageIds});
            }
            return newPage;
            
            
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }
 
    public async getDomainPages(req: any): Promise<IPage[]> {
        try {
            console.log(req.user.email);
            const user = await User.findOne({email: req.user.email});
            if(user) {  
                return await Page.getAllPages(user.pageIds);
            }
            throw createHttpError(404);
        } catch (error) {
            throw createHttpError(400);
        }
    }

    public async updatePage(req: any): Promise<void> {
        try {
            const user = await User.findOne({email: req.user.email});
        
            if (!user) {
                throw createHttpError(404, 'User not found');
            }

            const page = await Page.findOrCreate(new URL(req.body.address));
            
            await User.updatePageId(user, req.params.id, page.id);

        } catch (error) {
            console.log('error in service: ', error);

            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }
}