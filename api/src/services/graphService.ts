import { Request } from 'express';
import { createGPSIGraphHTML } from '../utils/htmlTemplate';
import Page from '../models/page';
import Measurement from '../models/measurements';
import createHttpError from 'http-errors';
export default class GraphService {
    private numberOfMeasurements = 30
    public async createGraph(req: Request): Promise<string> {
        try {
            const { address } = req.query;

            if (address) {
                const pageAddress = await Page.getByAddress(address as string);
                const measurements = await Measurement.findOne({addressID: pageAddress._id});
                
            
                
                if (measurements) {
                    const scores = (measurements?.scores.length > this.numberOfMeasurements) ? 
                        measurements?.scores.slice(measurements?.scores.length - this.numberOfMeasurements)
                        : measurements?.scores;
                    return createGPSIGraphHTML(scores, address as string);
                }
            } 

            throw createHttpError(400, { 
                message: {
                    detail: `Measurements for: ${address} does not exist`, 
                    address: address
                }
            });
        } catch (error) {
            throw error;
        }
    }
}