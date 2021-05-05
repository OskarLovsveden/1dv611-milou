import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema } from 'mongoose';
// import { URL } from 'url';

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
    findOrCreate(addressID: string): Promise<IMeasurement>
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
    addressID: {
        type: String,
        required: true,
        unique: true
    },
    scores: [ScoreSchema]
});

MeasurementSchema.statics.findOrCreate = async function(addressID: string): Promise<IMeasurement> {
    try {
        console.log('==============================aeasd');
        return await Measurement.findOneAndUpdate({addressID: addressID},{addressID: addressID, score: []}, {
            upsert: true, 
            new: true
        });
    } catch (error) {
        throw createHttpError(400);
    }
};

const Measurement: IMeasurementModel = mongoose.model<IMeasurement, IMeasurementModel>('Measurement', MeasurementSchema);

export default Measurement;
