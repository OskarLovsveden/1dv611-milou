import { NextFunction, Request } from 'express';
import createHttpError from 'http-errors';
import Page, { IPage } from '../models/page';
import { URL } from 'url';

interface pageData {
    href: string
    hostname: string
    pathname: string
}

export default class PageService {

    public async createPage(req: Request): Promise<IPage> {
        try {
            const pageInfo: pageData = this.getPageData(req.body);
            const existingPage = await Page.getByAddress(pageInfo.href);

            if (existingPage) {
                return existingPage;
            }
            return Page.create({
                domain: pageInfo.hostname,
                address: pageInfo.href,
                path: pageInfo.pathname
            });
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            console.log(error);
            throw createHttpError(400);
        }
       
    }

    private getPageData(req: Request): pageData {
        const { address } = req.body;
        const {href, hostname, pathname} = new URL(address);

        return {href, hostname, pathname};
    } 
}