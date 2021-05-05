import { Request } from 'express';
import Measurement, { IScore } from '../models/measurements';
import Page from '../models/page';
import fetch from 'node-fetch';
import { URL } from 'url';

export default class GPSIService {
    public async measurePages(address: string) : Promise<any> {
        try {
            const gpsiResultData = await this.gpsiAPIRequest(address);
            const formattedData = this.gpsiDataFormatter(gpsiResultData);
            const page = await Page.findOrCreate(new URL(address));

            return await Measurement.addScore(formattedData, page.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private async gpsiAPIRequest(address: string): Promise<any> {
        const encodedAddress = encodeURI(address);
        const response = await fetch(`${process.env.GPSI_URL}?url=${encodedAddress}&access_token=${process.env.GPSI_TOKEN}&category=PERFORMANCE`);
        return await response.json();
    }

    private gpsiDataFormatter(unformattedData: any): IScore {
        const categories = unformattedData.lighthouseResult.categories.performance.auditRefs
            .filter((metric: any) => metric.group === 'metrics')
            .map((category: any) => category.id)
            .map((result: any) => unformattedData.lighthouseResult.audits[result]);

        console.log(unformattedData.lighthouseResult.categories.performance.score);
        return {
            totalScore: unformattedData.lighthouseResult.categories.performance.score,
            categories
        };
    }
}