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
    test(): void
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

const UserPage: IUserPageModel = mongoose.model<IUserPage, IUserPageModel>('UserPage', schema);

export default UserPage;