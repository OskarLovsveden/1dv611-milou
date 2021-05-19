import { Request } from 'express';
import { graphTemplate } from '../utils/htmlTemplate';
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
                    
                    const graph = graphTemplate(measurements?.scores, address as string);
                    return graph;
                }
            } 
            throw createHttpError(404, 'wrong');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}