import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import User from '../models/user';
import { URL } from 'url';
import User from '../models/user';

export interface pageData {
    href: string
    hostname: string
    pathname: string
}

export default class PageService {

    // Change from any to request. -------------------------------------------
    public async createPage(req: any): Promise<IPage> {
        try {
            const foundPage = await Page.findOne({address: req.body.address});
            if(!foundPage){
                const newPage = await Page.insert(new URL(req.body.address));
                
                // Change to req.user.email or use jwt token -------------------------------------------------------
                const user = await User.findOne({email: req.user.email});
                if (user){
                    user.domainIds.push(newPage.id);
                    await user.save();
                }
                return newPage;
            } else {
                const user = await User.findOne({email: req.user.email});
                if (user){
                    if(!user.domainIds.includes(foundPage.id)){
                        user.domainIds.push(foundPage.id);
                        await user.save();
                    }
                }
                return foundPage;
            }
            
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