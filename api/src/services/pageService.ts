import { Request } from 'express';
import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import User from '../models/user';
import { URL } from 'url';
import UserPage, { IUserPage, MeasureAt } from '../models/userPage';
import { validateUrlResponse } from '../utils/urlUtilities';
import Measurement from '../models/measurements';
import GPSIService from './gpsiService';


export interface IPageData {
    page: IPage
    measureAt: 'Daily' | 'Weekly' | 'Monthly'
}

export default class PageService {
    private service: GPSIService = new GPSIService()

    public async createPage(req: Request): Promise<IPageData> {
        try {
            if (!this.testIntervalIsValid(req.body.testInterval)) {
                throw createHttpError(400, { 
                    message: {
                        detail: `${req.body.testInterval} is not a valid testInterval.`, 
                        testInterval: req.body.testInterval
                    } 
                });
            }

            const user = await User.findOne({email: req?.user?.email});
            await validateUrlResponse(req.body.address);

            const page = await Page.findOrCreate(new URL(req.body.address));
            await Measurement.findOrCreate(page.id);
            const userPage = await UserPage.findOrCreate(user?.id, page.id, (<any>MeasureAt)[req.body.testInterval]);

            await this.service.measurePages(page.address);
            
            return {
                page,
                measureAt: userPage.measureAt
            };
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

    public async getPages(req: Request): Promise<IPageData[]> {
        try {
            const user = await User.findOne({email: req?.user?.email});
            
            if(user) { 
                const userPages = await UserPage.getAllUserPages(user.id);

                if(req.query.domain) {
                    const domainPages = await Page.getAllDomainPages((req.query.domain as string), userPages);
                    const sortedDomainPages = this.sortAlphabeticallyByPath(domainPages);

                    return sortedDomainPages; 
                }

                const allPages = await Page.getAllPages(userPages);

                return this.sortAlphabeticallyByDomain(allPages);
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
            await validateUrlResponse(req.body.address);

            if (!this.testIntervalIsValid(req.body.testInterval)) {
                throw createHttpError(400, { 
                    message: {
                        detail: `${req.body.testInterval} is not a valid testInterval.`, 
                        testInterval: req.body.testInterval
                    } 
                });
            }

            const user = await User.findOne({email: req?.user?.email});
            const userPages = await UserPage.getAllUserPages(user?.id);
            const userPageIDS = userPages.map((userPage: IUserPage) => userPage.addressID);


            if (!userPageIDS.includes(req.params.id)) {
                throw createHttpError(403, 'Forbidden');
            }

            const page = await Page.findOrCreate(new URL(req.body.address));

            await UserPage.updateAddressID(user?.id, req.params.id, page.id, (<any>MeasureAt)[req.body.testInterval]);

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

    private testIntervalIsValid(testInterval: string) : boolean{
        return (testInterval in MeasureAt);
    }
    
    private sortAlphabeticallyByPath(address: IPageData[]) {
        return address.sort((a, b) => {
            if (a.page.path < b.page.path) return -1;
            else if (a.page.path > b.page.path) return 1;
            return 0;
        });
    }

    private sortAlphabeticallyByDomain(address: IPageData[]) {
        return address.sort((a, b) => {
            if (a.page.domain < b.page.domain) return -1;
            else if (a.page.domain > b.page.domain) return 1;
            return 0;
        });
    }
}