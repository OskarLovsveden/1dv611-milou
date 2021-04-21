import createHttpError from 'http-errors';
import Page, { IPage, IPageModel } from '../models/page';
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
                    console.log(user.pageIds.includes(foundPage.id), 'url-check');
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
            const user = await User.findOne({email: req.user.email});
            
            if(user) { 
                if(req.body.address) {
                    const url = new URL(req.body.address);
                    const domainPages = await Page.getAllDomainPages(url.href);
                    return this.sortAlphabetically(domainPages, 'path');
                }
                const allPages = await Page.getAllPages(user.pageIds);
                return this.sortAlphabetically(allPages, 'domain');
            }
            throw createHttpError(400);
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                console.log(error);
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
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
            console.log(page);
            
            await User.updatePageId(user, req.params.id, page.id);

        } catch (error) {
            console.log('error in service: ', error);

            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }

    private sortAlphabetically(address: IPage[], sortType: string) {
        return address.sort((a, b) => {
            if (a[sortType as keyof IPage] < b[sortType as keyof IPage]) return -1;
            else if (a[sortType as keyof IPage] > b[sortType as keyof IPage]) return 1;
            return 0;
        });
    }

    public async deletePage(req: any): Promise<void> {
        try {
            const user = await User.findOne({email: req.user.email});
        
            if (!user) {
                throw createHttpError(404, 'User not found');
            }

            await User.deletePageId(user, req.params.id);

        } catch (error) {
            console.log('error in service: ', error);

            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }
}