import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { URL } from 'url';
import { IUserPage } from './userPage';

export interface IPage extends Document {
    domain: string
    address: string
    path: string
}

export interface IPageModel extends Model<IPage> {
    getByAddress(address: string): Promise<IPage>
    insert(url: URL): Promise<IPage>
    getAllPages(userPages: IUserPage[]): Promise<IPage[]>
    getAllDomainPages(domain: string, userPages: IUserPage[]): Promise<IPage[]>
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
            delete ret._id;
            delete ret.createdAt;
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

PageSchema.statics.getAllPages = async function(userPages: IUserPage[]) {
    try {
        const pageIDS = userPages.map((up: IUserPage) => up.addressID);

        const pages = await Promise.all(pageIDS.map(async (page: string) => {
            return await Page.findOne({_id: page});
        }));
        return pages;
    } catch (error) {
        throw createHttpError(400);
    }
};

PageSchema.statics.getAllDomainPages = async function(address: string, userPages: IUserPage[]) {
    try { 
        const pages: IPage[] = [];
        for (const userPage of userPages) {
            const verifiedList = await Page.findOne({_id: userPage.addressID});
            if(verifiedList) {
                pages.push(verifiedList);
            }
        }

        const url = new URL(address);

        if(pages) {
            return pages.filter((page: IPage) => {
                return page.domain === url.hostname;
            }).map((page: IPage) => {
                return page;
            });
        }
    } catch (error) {
        throw createHttpError(400);
    }
};

PageSchema.statics.findOrCreate = async function(url: URL) {
    try {
        const {href, hostname, pathname} = url;

        const address = {
            domain: hostname,
            address:href,
            path: pathname
        };

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
