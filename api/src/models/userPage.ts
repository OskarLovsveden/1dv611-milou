import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema} from 'mongoose';

export enum MeasureAt {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly'
}

export interface IUserPage extends Document {
    userID: string
    addressID: string
    measureAt: 'Daily' | 'Weekly' | 'Monthly'
}

export interface IUserPageModel extends Model<IUserPage> {
    findOrCreate(userId: string, pageId: string, interval: MeasureAt): Promise<IUserPage>
}

export const schema = new Schema({
    userID: { type: String, required: true },
    addressID: { type: String, required: true },
    measureAt: { 
        type: String, 
        enum: ['Daily', 'Weekly', 'Monthly'],
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

schema.statics.findOrCreate = async function(userId: string, pageId: string, interval: MeasureAt): Promise<IUserPage> {
    try {
        const findCriteria = { userID: userId, addressID: pageId };
        const create = {userID: userId, addressID: pageId, measureAt: interval};

        return await UserPage.findOneAndUpdate(findCriteria,create, {
            upsert: true, 
            new: true
        });
    } catch (error) {
        throw createHttpError(400);
    }
};

const UserPage: IUserPageModel = mongoose.model<IUserPage, IUserPageModel>('UserPage', schema);

export default UserPage;