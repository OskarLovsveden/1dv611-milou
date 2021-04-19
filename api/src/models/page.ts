import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema} from 'mongoose';
import { URL } from 'url';

export interface IPage extends Document {
    domain: string
    address: string
    path: string
}

export interface IPageModel extends Model<IPage> {
    getByAddress(address: string): Promise<IPage>
    insert(url: URL): Promise<IPage>
    findOrCreate(url: URL, id: string): Promise<IPage>
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
            console.log(existingPage);
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

PageSchema.statics.findOrCreate = async function(url: URL, id: string) {
    try {
        const {href, hostname, pathname} = url;

        const condition = { _id: id };
        const address = {
            domain: hostname,
            address:href,
            path: pathname
        };

        await Page.findById(condition, async (err: any, page: IPage) => {
            if (err) console.log(err);
            return page
                ? page
                : await Page.create(address);
        });
    } catch (error) {
        console.log('error: ', error);
        throw createHttpError(400);
    }
};

const Page: IPageModel = mongoose.model<IPage, IPageModel>('Page', PageSchema);

export default Page;
