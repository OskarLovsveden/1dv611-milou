import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { URL } from 'url';
import { IUserPage } from './userPage';
import { IPageData } from '../services/pageService';

export interface IPage extends Document {
    domain: string
    address: string
    path: string
}

export interface IPageModel extends Model<IPage> {
    getByAddress(address: string): Promise<IPage>
    getAllPagesByIDS(pageIDS: string[]): Promise<IPage[]>
    insert(url: URL): Promise<IPage>
    getAllPages(userPages: IUserPage[]): Promise<IPageData[]>
    getAllDomainPages(domain: string, userPages: IUserPage[]): Promise<IPageData[]>
    findOrCreate(url: URL): Promise<IPage>
}

export const PageSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    address: {
        type: String,
        unique: true,
        required: true
    },
    path: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.updatedAt;
            delete ret.__v;
        }
    }
});

PageSchema.statics.getByAddress = async function(address: string) {
    try {
        const existingPage = await Page.findOne({address});

        return existingPage;
    } catch (error) {
        return null;
    }
};

PageSchema.statics.insert = async function(url: URL) {
    try {
        const {href, hostname, pathname} = url;
        const existingPage = await Page.findOne({address: href});

        if (existingPage) {
            return existingPage;
        }
        return await Page.create({
            domain: hostname,
            address:href,
            path: pathname
        });
    } catch (error) {
        throw createHttpError(400);
    }
};

PageSchema.statics.getAllPages = async function(userPages: IUserPage[]): Promise<IPageData[]> {
    try {
        const pages: IPageData[] = [];

        for (const userPage of userPages) {
            const page = await Page.findOne({_id: userPage.addressID});

            if (page) {
                pages.push({
                    page,
                    measureAt: userPage.measureAt
                });
            }
        }
        return pages;
    } catch (error) {
        throw createHttpError(400);
    }
};

PageSchema.statics.getAllPagesByIDS = async function(pageIDS: string[]): Promise<IPage[]> {
    try {
        const pages: IPage[] = [];

        for (const pageID of pageIDS) {
            const page = await Page.findOne({_id: pageID});

            if (page) {
                pages.push(page);
            }
        }
        return pages;
    } catch (error) {
        throw createHttpError(400);
    }
};

PageSchema.statics.getAllDomainPages = async function(domain: string, userPages: IUserPage[]) {
    try { 
        const pages: IPageData[] = [];
        for (const userPage of userPages) {
            const verifiedList = await Page.findOne({_id: userPage.addressID});
            if(verifiedList) {
                pages.push({
                    page: verifiedList,
                    measureAt: userPage.measureAt
                });
            }
        }
        /* const url = new URL(address); */ // remove/replace 'www.'
        if(pages) {
            return pages.filter((pageData: IPageData) => pageData.page.domain === domain)
                .map((pd: IPageData) => pd);
        }
    } catch (error) {
        throw createHttpError(400);
    }
};

PageSchema.statics.findOrCreate = async function(url: URL) {
    try {
        console.log(url);
        const {href, hostname, pathname} = url;



        const address = {
            domain: hostname.includes('www.') ? hostname.replace('www.', ''): hostname,
            address:href,
            path: pathname
        };
        console.log('=================');
        console.log(address);

        return await Page.findOneAndUpdate(address, address, {
            upsert: true, 
            new: true
        });

    } catch (error) {
        throw createHttpError(400);
    }
};

const Page: IPageModel = mongoose.model<IPage, IPageModel>('Page', PageSchema);

export default Page;
