import { Request } from 'express';
import fetch from 'node-fetch';

export default class GPSIService {
    public async measurePages(req: Request) {
        try {
            const { addresses } = req.body;
            const address = encodeURI(addresses[0]);

            const response = await fetch(`${process.env.GPSI_URL}?url=${address}&access_token=${process.env.GPSI_TOKEN}&category=PERFORMANCE`);
            const data = await response.json();

            const categories = data.lighthouseResult.categories.performance.auditRefs
                .filter((metric: any) => metric.group === 'metrics')
                .map((category: any) => category.id)
                .map((result: any) => data.lighthouseResult.audits[result]);

            return {
                measurements: {
                    totalScore: data.lighthouseResult.categories.performance.score,
                    categories: categories 
                } 
            };
        } catch (error) {
            console.log(error);
        }
    }
}