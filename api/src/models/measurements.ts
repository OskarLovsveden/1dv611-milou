import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { URL } from 'url';
import { schema } from './user';

export interface ICategory {
    id: string
    title: string
    description: string
    score: number
    displayValue: string
    numericValue: number
}

export interface IScore {
    totalScore: number
    categories: ICategory[]
}

export interface IMeasurement extends Document {
    address: string
    scores: IScore[]
}


export interface IMeasurementModel extends Model<IMeasurement> {
    test(id: string): Promise<void>
}


export const CategorySchema = new Schema({
    id: { type: String },
    title: { type: String },
    description: { type: String },
    score: { type: Number },
    displayValue: { type: String },
    numericValue: { type: Number }
});

export const ScoreSchema = new Schema({
    totalScore: { type: Number},
    categories: [CategorySchema],
}, {timestamps: true}
);

export const MeasurementSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    scores: [ScoreSchema]
});

schema.statics.test = async function(id: string): Promise<void> {
    console.log('test');
};



const Measurement: IMeasurementModel = mongoose.model<IMeasurement, IMeasurementModel>('Measurement', MeasurementSchema);

export default Measurement;
