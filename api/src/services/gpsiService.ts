import { Request } from 'express';
import Measurement, { IScore } from '../models/measurements';
import Page, { IPage } from '../models/page';
import UserPage, { IUserPage } from '../models/userPage';
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

    public async performScheduledMeasures() : Promise<void> {
        try {
            const newGPSIResults = [];
            const uniquePageIDS = await this.getPageIDS();
            const pages = await Page.getAllPagesByIDS(uniquePageIDS);
            
            for (const page of pages) {
                const data = await this.measurePages(page.address);
                newGPSIResults.push(data);
                console.log(data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    private async getPageIDS(): Promise<string[]> {
        const date = new Date();
        const pagesToMeasure: IUserPage[] = [];
        pagesToMeasure.push(...await UserPage.find({ measureAt: 'Daily' }));

        if (date.getDay() === 1) {
            pagesToMeasure.push(...await UserPage.find({ measureAt: 'Weekly' }));
        } 
        if (date.getDate() === 28) {
            pagesToMeasure.push(...await UserPage.find({ measureAt: 'Monthly' }));
        }
        return [...new Set(pagesToMeasure.map((page: IUserPage) => page.addressID))];
    }

    private async gpsiAPIRequest(address: string): Promise<any> {
        const encodedAddress = encodeURI(address);
        const response = await fetch(`${process.env.GPSI_URL}?url=${encodedAddress}&key=${process.env.GPSI_TOKEN}&category=PERFORMANCE`);
        console.log(response);
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