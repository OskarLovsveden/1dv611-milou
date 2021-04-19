import { Request } from 'express';
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
    public async createPage(req: any): Promise<void> {
        try {
            const foundPage = Page.findOne({domain: req.body.address});
            if(!foundPage){
                const newPage = await Page.insert(new URL(req.body.address));

                // Change to req.user.email -------------------------------------------------------
                const user = await User.findOne({email: 'ravenraskar3@hotmail.com'});
                if (user){
                    user.domainIds.push(newPage.id);
                    await user.save();
                }
            }
        } catch (error) {
            if(error.code === 'ERR_INVALID_URL') {
                throw createHttpError(400, `${error.input} is not a valid address.`);
            }
            throw createHttpError(400);
        }
    }
}