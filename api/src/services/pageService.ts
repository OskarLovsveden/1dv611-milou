import { Request } from 'express';
import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import User from '../models/user';
import { URL } from 'url';
import UserPage, { IUserPage, MeasureAt } from '../models/userPage';
import { validateUrlResponse } from '../utils/urlUtilities';
import Measurement from '../models/measurements';


export interface pageData {
    href: string
    hostname: string
    pathname: string
}

export default class PageService {

    public async createPage(req: Request): Promise<IPage> {
        try {

            const url = new URL(req.body.address);
            const testInterval: MeasureAt = (<any>MeasureAt)[req.body.testInterval];

            const user = await User.findOne({email: req?.user?.email});
            /* console.log(user) */
            await validateUrlResponse(req.body.address);
            const page = await Page.findOrCreate(url);
            console.log(page);
            const measurement = await Measurement.findOrCreate(page.id);
            console.log(measurement);
            const userPage = await UserPage.findOrCreate(user?.id, page.id, testInterval);

            return page;
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, { 
                    message: {
                        detail: `${error.input} is not a valid address.`, 
                        address: error.input
                    }
                });
            }
            console.log(error);
            throw error;
        }
    }
 
    public async getPages(req: Request): Promise<IPage[]> {
        try {
            const user = await User.findOne({email: req?.user?.email});
            
            if(user) { 
                const userPages = await UserPage.getAllUserPages(user.id);

                if(req.query.address) {
                    const url = new URL(req.query.address as string);
                    const domainPages = await Page.getAllDomainPages(url.href, userPages);
                    return this.sortAlphabetically(domainPages, 'path');
                }
                const allPages = await Page.getAllPages(userPages);
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
            
            const userPages = await UserPage.getAllUserPages(user?.id);
            const userPageIDS = userPages.map((userPage: IUserPage) => userPage.addressID);

            if (!user) {
                throw createHttpError(404, 'User not found');
            }

            if (!userPageIDS.includes(req.params.id)) {
                throw createHttpError(403, 'Forbidden');
            }

            await validateUrlResponse(req.body.address);
            const page = await Page.findOrCreate(new URL(req.body.address));
            await UserPage.updateAddressID(user.id, req.params.id, page.id);

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

            const userPages = await UserPage.getAllUserPages(user?.id);
            const userPageIDS = userPages.map((userPage: IUserPage) => userPage.addressID);

            if (!user) {
                throw createHttpError(404, 'User not found');
            }

            if (!userPageIDS.includes(req.params.id)) {
                throw createHttpError(403, 'Forbidden');
            }

            await UserPage.deletePageId(user.id, req.params.id);

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