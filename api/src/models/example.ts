import mongoose, { Document, Model, mongo, Schema} from 'mongoose';

export interface IExample extends Document {
    username: string
    password: string
}

export interface IExampleModel extends Model<IExample> {
    getById(id: number) : Promise<IExample>
}


export const ExampleSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Example: IExampleModel = mongoose.model<IExample, IExampleModel>('Example', ExampleSchema);

export default Example;
