import { Request } from 'express';
import { createGPSIGraphHTML } from '../utils/htmlTemplate';
import Page from '../models/page';
import Measurement from '../models/measurements';
import createHttpError from 'http-errors';
export default class GraphService {
    
    public async createGraph(req: Request): Promise<string> {
        try {
            const { address } = req.query;

            if (address) {
                const pageAddress = await Page.getByAddress(address as string);
                const measurements = await Measurement.findOne({addressID: pageAddress._id});

                if (measurements) {
                    return createGPSIGraphHTML(measurements?.scores, address as string);
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