import createHttpError from 'http-errors';
import mongoose, { Document, Model, Schema } from 'mongoose';

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
    addressID: string
    scores: IScore[]
}

export interface IMeasurementModel extends Model<IMeasurement> {
    findOrCreate(addressID: string): Promise<IMeasurement>
    addScore(score: IScore, addressID: string): Promise<IScore>
    getLatestMeasurement(addressID: string): Promise<IScore>
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
}, { timestamps: true }
);

export const MeasurementSchema = new Schema({
    addressID: {
        type: String,
        required: true,
        unique: true
    },
    scores: [ScoreSchema]
});

MeasurementSchema.statics.addScore = async function(scores: IScore, addressID: string): Promise<IScore> {
    try {
        const measurement = await Measurement.findOrCreate(addressID);

        measurement.scores.push(scores);

        await measurement.save();

        return scores;
    } catch (error) {
        throw createHttpError(400);
    }
};

MeasurementSchema.statics.findOrCreate = async function(addressID: string): Promise<IMeasurement> {
    try {
        return await Measurement.findOneAndUpdate({addressID: addressID},{addressID: addressID, score: []}, {
            upsert: true, 
            new: true
        });
    } catch (error) {
        throw createHttpError(400);
    }
};

MeasurementSchema.statics.getLatestMeasurement = async function(addressID: string): Promise<IScore> {
    try {
        let scores: IScore = { totalScore: 0, categories: []};
        
        const pageMeasurements = await Measurement.findOne({addressID});

        if (pageMeasurements && pageMeasurements.scores.length > 0) {
            scores = pageMeasurements.scores[pageMeasurements?.scores.length - 1];
        }

        return scores;
    } catch (error) {
        throw createHttpError(400);
    }
};



const Measurement: IMeasurementModel = mongoose.model<IMeasurement, IMeasurementModel>('Measurement', MeasurementSchema);

export default Measurement;
