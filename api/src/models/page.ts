import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema} from 'mongoose';

export interface IPage extends Document {
    domain: string
    address: string
    path: string
}

export interface IPageModel extends Model<IPage> {
    getById(id: number) : Promise<IPage>
    getByAddress(address: string): Promise<IPage>
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
    }
}, {timestamps: true});

PageSchema.statics.getByAddress = async function(address: string) {
    try {
        const existingPage = await Page.findOne({address});

        return existingPage;
    } catch (error) {
        null;
    }
};


const Page: IPageModel = mongoose.model<IPage, IPageModel>('Page', PageSchema);

export default Page;
