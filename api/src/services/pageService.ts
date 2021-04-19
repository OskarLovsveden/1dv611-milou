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
            console.log(req.body.address);
            const foundPage = await Page.findOne({address: req.body.address});

            console.log(foundPage);
            if(foundPage){
                console.log('skapa inte ny');
                const user = await User.findOne({email: req.user.email});
                if (user){
                    if(!user.pageIds.includes(foundPage.id)){
                        user.pageIds.push(foundPage.id);
                        await user.save();
                    }
                }
                return foundPage;
            } 
                
            console.log('SKapa ny');
            const newPage = await Page.insert(new URL(req.body.address));
            
            // Change to req.user.email or use jwt token -------------------------------------------------------
            const user = await User.findOne({email: req.user.email});
            if (user){
                user.pageIds.push(newPage.id);
                await user.save();
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